'use strict';

require('../css/lg-ad.scss');
require('./lg-carrier.scss');
module.exports = 'lg-carrier';

var app = angular.module(module.exports, ['ui.router']);
require('./lg-carrier-route.js');
require('./lg-carrier-create-route.js');

app.service('carrier', function Carrier(user, $http, $state, $q) {
	'ngInject';

	var service = this;
	this.createData = {
		type: 'benne',
		height: 2,
		width: 10,
		depth: 8,
		city: {city: 'Ain Tolba', region: 'A\u00efn T\u00e9mouchent', country: 'Algérie'},
		conditioning: 'Palette',
		maxVolume: 3,
		maxWeight: 12,
		birthyear: 2008
	};

	this.create = function() {
		console.log('carrier->create', service.createData);
		if (user.account) {
			$http({
				url: 'ws/carrier/create.php',
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
				$state.go('carrier:created');
			}).catch(function(error) {
				console.error('error', error);
			});
		} else {
			localStorage.setItem('carrier', angular.toJson(service.createData));
			user.setAfterConnectAction({
				state: 'carrier:created',
				service: 'carrier',
				fn: 'createAfterConnect',
				args: []
			});
			$state.go('user:hasAccount');
		}

	};

	this.createAfterConnect = function() {
		service.createData = angular.fromJson(localStorage.getItem('carrier'));
		localStorage.removeItem('carrier');
		console.log('carrier->createAfterConnect', service.createData);
		service.create();
	};

	this.list = function() {
		console.log('carrier->list');
		return $http({
			url: 'ws/carrier/list.php',
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
			service.carrierMap = response.data.carriers;
			console.log('service.carrierMap', service.carrierMap);
			service.carriers = values(service.carrierMap);
			console.log('service.carriers', service.carriers);
		}).catch(function(error) {
			service.error = error;
		});
	};

	this.get = function(id) {
		if (service.carrierMap === undefined) {
			return this.list().then(function() {
				service.current = service.carrierMap[id];
			});
		}
		service.current = service.carrierMap[id];
		return $q.resolve();
	};

	this.updateData = {};

	this.update = function() {
		console.log('updateCarrier->update', service.updateData);
		$http({
			url: 'ws/carrier/update.php',
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
			service.current = response.data.carrier;
			console.log('about to go to', response);
			$state.go('carrier:updated');
		}).catch(function(error) {
			service.error = error;
			console.error('error', error);
		});
	};

	this.delete = function(id) {
		console.log('carrier->delete');
		return $http({
			url: 'ws/carrier/delete.php',
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
			service.carriers = undefined;
			service.current = undefined;
			$state.go('carrier:deleted');
		});
	};

});

