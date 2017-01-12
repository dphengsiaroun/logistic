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
		url: '/{login}/truck/{id}/update',
		component: 'lgTruckUpdateRoute'
	});
	$stateProvider.state({
		name: 'truck:updated',
		url: '/updated-truck',
		component: 'lgMessage',
		resolve: {
			service: function(user, truck) {
				'ngInject';
				return user.waitForCheckConnection().then(function() {
					var login = user.account.content.login;
					console.log('login', login);
					var state = 'truck:list({login: \'' + login + '\'})';
					console.log('state', state);
					return {
						state: state,
						label: 'Revenir à la liste des véhicules',
						message: 'Votre véhicule a bien été modifié.'
					};
				});
			}
		}
	});
	$stateProvider.state({
		name: 'truck:delete',
		url: '/{login}/truck/{id}/delete',
		component: 'lgConfirm',
		resolve: {
			service: function($rootScope, truck, $stateParams) {
				'ngInject';
				var result = {};
				result.doCancel = function() {
					$rootScope.back();
				};
				result.doConfirm = function() {
					truck.delete($stateParams.id).catch(function(error) {
						result.error = error;
					});
				};
				result.confirmationMsg = 'Voulez-vous vraiment supprimer ce véhicule&nbsp;?';
				result.cancelMsg = 'Non, annuler';
				result.confirmMsg = 'Oui, supprimer';
				return result;
			}
		}
	});
	$stateProvider.state({
		name: 'truck:deleted',
		url: '/deleted-truck',
		component: 'lgMessage',
		resolve: {
			service: function(user, truck) {
				'ngInject';
				return user.waitForCheckConnection().then(function() {
					var login = user.account.content.login;
					console.log('login', login);
					var state = 'truck:list({login: \'' + login + '\'})';
					console.log('state', state);
					return {
						state: state,
						label: 'Revenir à la liste des véhicules',
						message: 'Votre véhicule a bien été supprimé.'
					};
				});
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
	this.user = $injector.get('user');
	var $stateParams = $injector.get('$stateParams');
	console.log('this.truck', this.truck);
	console.log('$stateParams', $stateParams);
	this.$onInit = function() {
		this.truck.get($stateParams.id);
	};
}]);

app.controller('TruckCreateCtrl', function TruckCtrl($scope, $injector) {
	'ngInject';
	this.truck = $injector.get('truck');
	this.user = $injector.get('user');
});

app.controller('TruckUpdateCtrl', ['$scope', '$injector', function TruckUpdateCtrl($scope, $injector) {
	var self = this;
	this.truck = $injector.get('truck');
	this.user = $injector.get('user');
	var $stateParams = $injector.get('$stateParams');
	this.$onInit = function() {
		this.truck.get($stateParams.id);
		$scope.$watch('$ctrl.truck.current', function() {
			if (self.truck.current === undefined) {
				return;
			}
			self.truck.updateData = angular.copy(self.truck.current);
			self.truck.updateData.oldId = $stateParams.id;
			console.log('self.truck.updateData', self.truck.updateData);
		});
	};
}]);

var truckCreateUrl = require('./tmpl/truck-create.html');
var truckListUrl = require('./tmpl/truck-list.html');
var truckDetailUrl = require('./tmpl/truck-detail.html');
var truckUpdateUrl = require('./tmpl/truck-update.html');

app.component('lgTruckCreateRoute', {
	templateUrl: truckCreateUrl,
	controller: 'TruckCreateCtrl',
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
	controller: 'TruckUpdateCtrl',
});

