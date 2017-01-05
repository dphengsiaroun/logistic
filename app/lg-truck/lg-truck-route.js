'use strict';

var app = angular.module('lg-truck');

app.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state({
		name: 'truck:list',
		url: '/{login}/truck',
		component: 'lgTruckListRoute',
		needsUser: true
	});
	$stateProvider.state({
		name: 'truck:retrieve',
		url: '/{login}/truck/{id}',
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
			service: function(user) {
				'ngInject';
				var login = user.account.content.login;
				console.log('login', login);
				var state = 'truck:list({login: \'' + login + '\'})';
				console.log('state', state);
				return {
					state: state,
					label: 'Revenir à la liste des véhicules',
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
					state: 'truck:list',
					label: 'Revenir à la liste des véhicules',
					message: 'Votre véhicule a bien été modifié.'
				};
			}
		},
		back: false
	});
	$stateProvider.state({
		name: 'truck:delete',
		url: '/truck/:id/delete',
		component: 'lgConfirm',
		resolve: {
			service: ['$injector', function($injector) {
				var user = $injector.get('user');
				var $state = $injector.get('$state');
				var result = {};
				result.doCancel = function() {
					$state.go('truck:list');
				};
				result.doConfirm = function() {
					user.delete();
				};
				result.confirmationMsg = 'Voulez-vous vraiment supprimer ce véhicule&nbsp;?';
				result.cancelMsg = 'Non, annuler';
				result.confirmMsg = 'Oui, supprimer';
				return result;
			}]
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
					label: 'Revenir à la liste des véhicules',
					message: 'Votre véhicule a bien été supprimé.'
				};
			}
		},
		back: false
	});

}]);

app.controller('TruckListCtrl', ['$scope', '$injector', function TruckCtrl($scope, $injector) {
	this.truck = $injector.get('truck');
	this.user = $injector.get('user');
	this.$onInit = function() {
		this.truck.list();
	};
}]);

app.controller('TruckCtrl', ['$scope', '$injector', function TruckCtrl($scope, $injector) {
	this.truck = $injector.get('truck');
	var $stateParams = $injector.get('$stateParams');
	console.log('this.truck', this.truck);
	console.log('$stateParams', $stateParams);
	this.$onInit = function() {
		this.truck.get($stateParams.id);
	};
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
	controller: 'TruckListCtrl',
});

app.component('lgTruckRetrieveRoute', {
	templateUrl: truckDetailUrl,
	controller: 'TruckCtrl',
});

app.component('lgTruckUpdateRoute', {
	templateUrl: truckUpdateUrl,
	controller: 'TruckCtrl',
});

