'use strict';

require('../css/lg-ad.scss');
module.exports = 'lg-loader';

var app = angular.module(module.exports, ['ui.router']);
require('./lg-loader-route.js');

app.service('loader', function Loader(user, $http, $state, $q) {
	'ngInject';

	var service = this;
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
		var createData = service.createData;
		if (user.account) {
			$http({
				url: 'ws/loader/create.php',
				method: 'POST',
				data: createData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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
			user.setAfterConnectAction({
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

	service.listData = {
	};

	service.list = function() {
		console.log('loader->list');
		return $http({
			url: 'ws/loader/list.php',
			method: 'POST',
			data: service.listData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.loaderMap = response.data.loaders;
			console.log('service.loaderMap', service.loaderMap);
			service.loaders = values(service.loaderMap);
			console.log('service.loaders', service.loaders);
		}).catch(function(error) {
			service.error = error;
		});
	};

	service.get = function(id) {
		if (service.loaderMap === undefined) {
			return service.list().then(function() {
				service.current = service.loaderMap[id];
			});
		}
		service.current = service.loaderMap[id];
		return $q.resolve();
	};

	service.updateData = {};

	service.update = function() {
		console.log('updateLoader->update', service.updateData);
		$http({
			url: 'ws/loader/update.php',
			method: 'POST',
			data: service.updateData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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
			url: 'ws/loader/delete.php',
			method: 'POST',
			data: {
				id: id
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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

