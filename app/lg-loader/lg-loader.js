'use strict';

require('./lg-loader.css');
module.exports = 'lg-loader';

var app = angular.module(module.exports, ['ui.router']);
require('./lg-loader-route.js');

app.service('loader', ['$injector', function Loader($injector) {
	var $http = $injector.get('$http');
	var $state = $injector.get('$state');

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
		preciseWeight: '9',
		height: '2',
		deep: '5',
		width: '10',
		volume: '200',
		priceWanted: '300',
		adTimes: '1 semaine',

	};

	this.create = function() {
		console.log('loader->createLoader');
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
			service.isLoaderError = false;
			$state.go('loader:created');
		}).catch(function(error) {
			console.error('error', error);
		});
	};

	this.list = function() {
		console.log('loader->list');
		return $http({
			url: 'ws/loader/list.php',
			method: 'GET'
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
			this.list().then(function() {
				service.current = service.loaderMap[id];
			});
		} else {
			service.current = service.loaderMap[id];
		}
	};

	this.updateData = {};

	this.update = function() {
		console.log('updateLoader->update');
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

}]);

