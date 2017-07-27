require('./lg-carrier.scss');
module.exports = 'lg-carrier';

const app = angular.module(module.exports, ['ui.router']);
require('./lg-carrier-route.js');
require('./lg-carrier-create-route.js');

app.service('carrier', function Carrier($http, $state, $q, connection, user) {
	'ngInject';

	var service = this;

	service.initCreateData = function() {
		service.createData = {
			truck: undefined,
			availability: undefined,
			pricing: undefined
		};
	};
	service.initCreateData();

	service.create = function() {
		console.log('carrier->create', service.createData);
		if (user.current) {
			$http({
				url: 'ws/carriers',
				method: 'POST',
				data: service.createData,
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === 'ko') {
					service.error = response;
					return;
				}
				service.error = undefined;
				service.initCreateData();
				$state.go('carrier:created');
			}).catch(function(error) {
				console.error('error', error);
			});
		} else {
			localStorage.setItem('carrier', angular.toJson(service.createData));
			connection.setAfterConnectAction({
				state: 'carrier:created',
				service: 'carrier',
				fn: 'createAfterConnect',
				args: []
			});
			service.initCreateData();
			$state.go('user:hasAccount');
		}

	};

	service.createAfterConnect = function() {
		service.createData = angular.fromJson(localStorage.getItem('carrier'));
		localStorage.removeItem('carrier');
		console.log('carrier->createAfterConnect', service.createData);
		service.create();
	};

	service.list = function(data) {
		console.log('carrier->list');
		return $http({
			url: 'ws/carriers',
			method: 'GET',
			params: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return $q.reject(response);
			}
			service.error = undefined;
			return response.data.carriers;
		}).catch(function(error) {
			service.error = error;
			return $q.reject(error);
		});
	};

	service.get = function(id) {
		console.log('service.carriers', service.carriers);
		return this.list().then(function(carriers) {
			service.carriers = carriers;
			service.carrierMap = makeMap(carriers);
			service.current = service.carrierMap[id];
		});
		service.current = service.carrierMap[id];
		return $q.resolve();
	};

	service.updateData = {};

	service.update = function() {
		service.updateData = service.createData;
		service.initCreateData();
		console.log('updateCarrier->update', service.updateData);
		$http({
			url: 'ws/carriers/' + service.updateData.id,
			method: 'PUT',
			data: service.updateData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.current = response.data.carrier;
			console.log('about to go to', response);
			$state.go('carrier:updated');
		}).catch(function(error) {
			service.error = error;
			console.error('error', error);
		});
	};

	service.delete = function(id) {
		console.log('carrier->delete');
		return $http({
			url: 'ws/carriers/' + id,
			method: 'DELETE'
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				return $q.reject(response);
			}
			service.error = undefined;
			service.carriers = undefined;
			service.current = undefined;
			$state.go('carrier:deleted');
		});
	};

});

