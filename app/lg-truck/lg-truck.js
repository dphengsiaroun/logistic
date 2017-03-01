'use strict';

require('../css/lg-ad.scss');
require('./lg-truck.scss');
module.exports = 'lg-truck';

var app = angular.module(module.exports, ['ui.router']);
require('./lg-truck-route.js');

app.service('truck', function Truck($q, $http, $state, user) {
	'ngInject';
	var service = this;
	service.createData = {
		type: 'benne',
		height: 1,
		width: 1,
		depth: 1,
		country: 'Algerie',
		conditioning: 'Palette',
		maxVolume: '3',
		maxWeight: '12',
		birthyear: '2008'
	};

	service.create = function() {
		console.log('truck->createTruck');
		$http({
			url: 'ws/truck/create.php',
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
			$state.go('truck:created');
		}).catch(function(error) {
			console.error('error', error);
		});
	};

	service.list = function() {
		console.log('truck->list');
		return $http({
			url: 'ws/truck/list.php',
			method: 'GET'
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.truckMap = response.data.trucks;
			console.log('service.truckMap', service.truckMap);
			service.trucks = values(service.truckMap);
			console.log('service.trucks', service.trucks);
		}).catch(function(error) {
			service.error = error;
		});
	};

	service.get = function(id) {
		console.log('get', arguments);
		if (id === undefined) {
			throw new Error('id is undefined');
		}
		if (service.truckMap === undefined) {
			service.list().then(function() {
				service.current = service.truckMap[id];
			});
		} else {
			service.current = service.truckMap[id];
		}
	};

	service.empty = function() {
		console.log('empty', arguments);
		return user.waitForCheckConnection().then(function() {
			if (service.truckMap === undefined) {
				return service.list();
			} else {
				return true;
			}
		}).then(function() {
			for (var p in service.truckMap) {
				if (service.truckMap.hasOwnProperty(p)) {
					return $q.resolve();
				}
			}
			return $q.reject();
		});
	};

	service.updateData = {};

	service.update = function() {
		console.log('updateTruck->update');
		$http({
			url: 'ws/truck/update.php',
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
			service.current = response.data.truck;
			console.log('about to go to', response);
			$state.go('truck:updated');
		}).catch(function(error) {
			service.error = error;
			console.error('error', error);
		});
	};

	this.delete = function(id) {
		console.log('truck->delete');
		return $http({
			url: 'ws/truck/delete.php',
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
			service.trucks = undefined;
			service.current = undefined;
			$state.go('truck:deleted');
		});
	};

});

