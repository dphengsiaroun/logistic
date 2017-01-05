'use strict';

var app = angular.module('lg-truck');

app.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state({
		name: 'truck:list',
		url: '/{accountId}/truck',
		component: 'lgTruckListRoute',
		needsUser: true
	});
	$stateProvider.state({
		name: 'truck:retrieve',
		url: '/truck/:id',
		component: 'lgTruckRetrieveRoute',
		needsUser: true
	});
	$stateProvider.state({
		name: 'truck:create',
		url: '/create-truck',
		component: 'lgTruckCreateRoute',
		needsUser: true
	});
	$stateProvider.state({
		name: 'truck:created',
		url: '/create-truck',
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
		needsUser: true,
		back: false
	});
	$stateProvider.state({
		name: 'truck:update',
		url: '/truck/:id/update',
		component: 'lgTruckUpdateRoute'
	});
	$stateProvider.state({
		name: 'truck:updated',
		url: '/truck/:id/update',
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
		name: 'truck:delete',
		url: '/truck/:id/delete',
		component: 'lgPrompt',
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
		url: '/deleted-truck',
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

app.component('lgTruckRetrieveRoute', {
	templateUrl: truckDetailUrl,
	controller: 'TruckCtrl',
});

app.component('lgTruckUpdateRoute', {
	templateUrl: truckUpdateUrl,
	controller: 'TruckCtrl',
});

