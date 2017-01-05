'use strict';

require('./lg-truck.css');
module.exports = 'lg-truck';

var app = angular.module(module.exports, ['ui.router']);
require('./lg-truck-route.js');

app.service('truck', ['$injector', function Truck($injector) {
	var $http = $injector.get('$http');
	var $state = $injector.get('$state');

	var service = this;
	this.createData = {
		content: {
			type: 'benne',
			height: '2',
			width: '10',
			deep: '8',
			country: 'Algerie',
			city: 'Alger',
			conditioning: 'Palette',
			maxVolume: '3',
			maxWeight: '12',
			birthyear: '2008'
		}
	};

	this.createTruck = function() {
		console.log('truck->createTruck');
		$http({
			url: 'ws/truck/create.php',
			method: 'POST',
			data: service.createData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.isTruckError = true;
				return;
			}
			service.isTruckError = false;
			$state.go('truck:created');
		}).catch(function(error) {
			console.error('error', error);
		});
	};

	this.list = function() {
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

	this.get = function(id) {
		if (service.truckMap === undefined) {
			this.list().then(function() {
				service.current = service.truckMap[id];
			});
		} else {
			service.current = service.truckMap[id];
		}
	};

	this.updateTruck = function(data) {
		console.log('updateTruck->update');
		$http({
			url: 'ws/truck/update.php',
			method: 'POST',
			data: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.isTruckError = true;
				return;
			}
			service.isTruckError = false;
			service.trucks = response.data.trucks;
			$state.go('truck:update');
		}).catch(function(error) {
			console.error('error', error);
		});
	};

	this.delete = function() {
		console.log('truck->delete');
		$http({
			url: 'ws/truck/delete.php',
			method: 'POST',
			data: {
				id: service.ads.id
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.isDeleteError = true;
				return;
			}
			service.isDeleteError = false;
			service.trucks = undefined;
			$state.go('truck:deleted');
		});
	};

}]);

