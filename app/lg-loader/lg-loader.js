'use strict';

require('../css/lg-ad.scss');
// require('./lg-loader.scss');
module.exports = 'lg-loader';

var app = angular.module(module.exports, ['ui.router']);
require('./lg-loader-route.js');

app.service('loader', function Loader(user, $http, $state, $q) {
	'ngInject';

	var service = this;
	this.createData = {
		countryDepart: 'Algerie',
		cityDepart: 'Oran',
		countryArrived: 'Algerie',
		cityArrived: 'Alger',
		loaderType: 'Classique',
		conditioning: 'Colis',
		transportType: 'Camion',
		truckType: 'Bache',
		loaderWeight: '90',
		height: 2,
		deep: 5,
		width: 10,
		priceWanted: 300,
		adTimes: '1 semaine',

	};

	this.create = function() {
		console.log('loader->create', service.createData);
		if (user.account) {
			$http({
				url: 'ws/loader/create.php',
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
				$state.go('loader:created');
			}).catch(function(error) {
				console.error('error', error);
			});
		} else {
			localStorage.setItem('loader', angular.toJson(service.createData));
			user.setAfterConnectAction({
				state: 'loader:created',
				fn: service.createAfterConnect,
				args: []
			});
			$state.go('user:hasAccount');
		}

	};

	this.createAfterConnect = function() {
		service.createData = angular.fromJson(localStorage.getItem('loader'));
		localStorage.removeItem('loader');
		console.log('loader->createAfterConnect', service.createData);
		service.create();
	};

	this.listData = {
	};

	this.list = function() {
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

	this.get = function(id) {
		if (service.loaderMap === undefined) {
			return this.list().then(function() {
				service.current = service.loaderMap[id];
			});
		}
		service.current = service.loaderMap[id];
		return $q.resolve();
	};

	this.updateData = {};

	this.update = function() {
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

	this.delete = function(id) {
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

