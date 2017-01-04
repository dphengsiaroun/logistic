'use strict';

require('./lg-truck.css');
module.exports = 'lg-truck';

var app = angular.module(module.exports, ['ui.router']);

app.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state({
		name: 'truck:list',
		url: '/truck/list',
		component: 'lgTruckListRoute',
		needsUser: true
	});
	$stateProvider.state({
		name: 'truck:retrieve',
		url: '/truck/retrieve',
		component: 'lgTruckRetrieveRoute',
		needsUser: true
	});
	$stateProvider.state({
		name: 'truck:create',
		url: '/truck/create',
		component: 'lgTruckCreateRoute',
		needsUser: true
	});
	$stateProvider.state({
		name: 'truck:created',
		url: '/truck/create',
		component: 'lgMessage',
		resolve: {
			service: function() {
				return {
					state: 'home',
					label: 'Accueil',
					message: 'Votre véhicule a bien été ajouté.'
				};
			}
		},
		back: false
	});
	$stateProvider.state({
		name: 'truck:detail',
		url: '/truck/detail',
		component: 'lgTruckDetailRoute'
	});
	$stateProvider.state({
		name: 'truck:update',
		url: '/truck/update',
		component: 'lgTruckUpdateRoute'
	});
	$stateProvider.state({
		name: 'truck:updated',
		url: '/truck/update',
		component: 'lgMessage',
		resolve: {
			service: function() {
				return {
					state: 'home',
					label: 'Accueil',
					message: 'Votre camion a bien été ajouté à votre liste.'
				};
			}
		},
		back: false
	});
	$stateProvider.state({
		name: 'truck:deleted',
		url: '/truck/delete',
		component: 'lgMessage',
		resolve: {
			service: function() {
				return {
					state: 'home',
					label: 'Accueil',
					message: 'Votre camion a bien été supprimé.'
				};
			}
		},
		back: false
	});

}]);

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
		$http({
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

app.controller('TrucksCtrl', ['$scope', '$injector', function TruckCtrl($scope, $injector) {
	this.truck = $injector.get('truck');
	this.$onInit = function() {
		this.truck.list();
	};
}]);

app.controller('TruckCtrl', ['$scope', '$injector', function TruckCtrl($scope, $injector) {
	this.truck = $injector.get('truck');
}]);

app.controller('TruckUpdateCtrl', ['$scope', '$injector', function TruckUpdateCtrl($scope, $injector) {
	var self = this;
	this.truck = $injector.get('truck');
	console.log('this.truck', this.truck);
	$scope.$watch('$ctrl.truck', function() {
		self.updateData = angular.copy(self.truck);
	});

	console.log('this.updateData', this.updateData);
	this.truck.error = undefined;
}]);

var truckCreateUrl = require('./tmpl/truck-create.html');
var truckListUrl = require('./tmpl/truck-list.html');
var truckDetailUrl = require('./tmpl/truck-detail.html');
var truckUpdateUrl = require('./tmpl/truck-update.html');

app.component('lgTruckCreateRoute', {
	templateUrl: truckCreateUrl,
	controller: 'TruckCtrl',
});

app.component('lgTruckListRoute', {
	templateUrl: truckListUrl,
	controller: 'TrucksCtrl',
});

app.component('lgTruckDetailRoute', {
	templateUrl: truckDetailUrl,
	controller: 'TruckCtrl',
});

app.component('lgTruckUpdateRoute', {
	templateUrl: truckUpdateUrl,
	controller: 'TruckCtrl',
});

