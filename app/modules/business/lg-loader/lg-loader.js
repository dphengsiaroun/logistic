require('./lg-loader.scss');
module.exports = 'lg-loader';

const app = angular.module(module.exports, ['ui.router']);
require('./lg-loader-route.js');

app.service('loader', function Loader($http, $state, $q, connection, user) {
	'ngInject';

	const service = this;
	service.initCreateData = function() {
		service.createData = {
			typeOfGoods: 'Classique',
			transportTruckType: 'Bâché',
			weightInterval: '',
			imageId: new Date().getTime()
		};
	};
	service.initCreateData();


	service.create = function() {
		console.log('loader->create', service.createData);
		const createData = service.createData;
		if (user.current) {
			$http({
				url: 'ws/loaders',
				method: 'POST',
				data: createData,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === 'ko') {
					service.error = response;
					return;
				}
				service.error = undefined;
				service.initCreateData();
				$state.go('loader:created');
			}).catch(function(error) {
				console.error('error', error);
			});
		} else {
			createData.userNotConnected = true;
			localStorage.setItem('loader', angular.toJson(createData));
			connection.setAfterConnectAction({
				state: 'loader:created',
				service: 'loader',
				fn: 'createAfterConnect',
				args: []
			});
			service.initCreateData();
			$state.go('user:hasAccount');
		}

	};

	service.createAfterConnect = function() {
		service.createData = angular.fromJson(localStorage.getItem('loader'));
		localStorage.removeItem('loader');
		console.log('loader->createAfterConnect', service.createData);
		service.create();
	};

	service.listData = {};

	service.list = function(data) {
		console.log('loader->list');
		return $http({
			url: 'ws/loaders',
			method: 'GET',
			params: data,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return $q.reject(response);
			}
			service.error = undefined;
			return response.data.loaders;
		}).catch(function(error) {
			service.error = error;
			return $q.reject(error);
		});
	};

	service.get = function(id) {
		return service.list().then(function(loaders) {
			service.loaders = loaders;
			service.loaderMap = makeMap(loaders);
			service.current = service.loaderMap[id];
		});
		service.current = service.loaderMap[id];
		return $q.resolve();
	};

	service.updateData = {};

	service.update = function() {
		console.log('updateLoader->update', service.updateData);
		$http({
			url: 'ws/loaders/' + service.updateData.id,
			method: 'PUT',
			data: service.updateData,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.current = response.data.loader;
			console.log('about to go to', response);
			$state.go('loader:updated');
		}).catch(function(error) {
			service.error = error;
			console.error('error', error);
		});
	};

	service.delete = function(id) {
		console.log('loader->delete');
		return $http({
			url: 'ws/loaders/' + id,
			method: 'DELETE'
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				return $q.reject(response);
			}
			service.error = undefined;
			service.loaders = undefined;
			service.current = undefined;
			$state.go('loader:deleted');
		});
	};

});
