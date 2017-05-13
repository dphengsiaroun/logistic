'use strict';

require('./lg-truck.scss');
module.exports = 'lg-truck';

var app = angular.module(module.exports, ['ui.router']);
require('./lg-truck-route.js');

app.service('truck', function Truck($q, $http, $state, user) {
	'ngInject';
	var service = this;
	service.initCreateData = function() {
		service.createData = {
			imageId: new Date().getTime()
		};
	};
	service.initCreateData();

	service.create = function() {
		console.log('truck->createTruck');
		var createData = service.createData;
		if (user.account) {
			$http({
				url: 'ws/users/' + user.account.content.login + '/trucks',
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
				service.initCreateData();
				service.error = undefined;
				$state.go('truck:created');
			}).catch(function(error) {
				console.error('error', error);
			});
		} else {
			console.log('user not connected');
			createData.userNotConnected = true;
			localStorage.setItem('truck', angular.toJson(createData));
			user.setAfterConnectAction({
				state: 'truck:created',
				service: 'truck',
				fn: 'createAfterConnect',
				args: []
			});
			service.initCreateData();
			$state.go('user:hasAccount');
		}
	};

	service.createAfterConnect = function() {
		service.createData = angular.fromJson(localStorage.getItem('truck'));
		localStorage.removeItem('truck');
		console.log('truck->createAfterConnect', service.createData);
		service.create();
	};

	service.list = function() {
		console.log('truck->list');
		return user.waitForCheckConnection().then(function() {
			return $http({
				url: 'ws/users/' + user.account.content.login + '/trucks',
				method: 'GET'
			});
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
			return $q.reject('id is undefined');
		}
		if (service.truckMap === undefined) {
			return service.list().then(function() {
				service.current = service.truckMap[id];
			});
		}
		service.current = service.truckMap[id];
		return $q.resolve();
	};

	service.empty = function() {
		console.log('empty', arguments);
		return user.waitForCheckConnection().then(function() {
			return service.list();
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
		user.waitForCheckConnection().then(function() {
			return $http({
				url: 'ws/users/' + user.account.content.login + '/trucks/' + service.updateData.id,
				method: 'PUT',
				data: service.updateData,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
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
		return user.waitForCheckConnection().then(function() {
			return $http({
				url: 'ws/users/' + user.account.content.login + '/trucks/' + id,
				method: 'DELETE',
				data: {
					id: id
				},
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			});
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
