'use strict';

var app = angular.module('lg-carrier');

app.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state({
		name: 'carrier:list',
		url: '/{login}/carrier',
		component: 'lgCarrierListRoute',
		needsUser: true
	});
	$stateProvider.state({
		name: 'carrier:retrieve',
		url: '/{login}/carrier/{id}',
		component: 'lgCarrierRetrieveRoute',
		needsUser: true
	});
	$stateProvider.state({
		name: 'carrier:create',
		url: '/create-carrier',
		component: 'lgCarrierCreateRoute',
		needsUser: true
	});
	$stateProvider.state({
		name: 'carrier:created',
		url: '/create-carrier',
		component: 'lgMessage',
		resolve: {
			service: function(user) {
				'ngInject';
				var login = user.account.content.login;
				console.log('login', login);
				var state = 'carrier:list({login: \'' + login + '\'})';
				console.log('state', state);
				return {
					state: state,
					label: 'Revenir à la liste des transports',
					message: 'Votre transport a bien été ajouté.'
				};
			}
		},
		needsUser: true,
		back: false
	});
	$stateProvider.state({
		name: 'carrier:update',
		url: '/{login}/carrier/{id}/update',
		component: 'lgCarrierUpdateRoute'
	});
	$stateProvider.state({
		name: 'carrier:updated',
		url: '/updated-carrier',
		component: 'lgMessage',
		resolve: {
			service: function(user, carrier) {
				'ngInject';
				return user.waitForCheckConnection().then(function() {
					var login = user.account.content.login;
					console.log('login', login);
					var state = 'carrier:list({login: \'' + login + '\'})';
					console.log('state', state);
					return {
						state: state,
						label: 'Revenir à la liste des transports',
						message: 'Votre transport a bien été ajouté.'
					};
				});
			}
		}
	});
	$stateProvider.state({
		name: 'carrier:delete',
		url: '/{login}/carrier/{id}/delete',
		component: 'lgConfirm',
		resolve: {
			service: function($rootScope, carrier, $stateParams) {
				'ngInject';
				var result = {};
				result.doCancel = function() {
					$rootScope.back();
				};
				result.doConfirm = function() {
					carrier.delete($stateParams.id).catch(function(error) {
						result.error = error;
					});
				};
				result.confirmationMsg = 'Voulez-vous vraiment supprimer ce transport&nbsp;?';
				result.cancelMsg = 'Non, annuler';
				result.confirmMsg = 'Oui, supprimer';
				return result;
			}
		}
	});
	$stateProvider.state({
		name: 'carrier:deleted',
		url: '/deleted-carrier',
		component: 'lgMessage',
		resolve: {
			service: function(user, carrier) {
				'ngInject';
				return user.waitForCheckConnection().then(function() {
					var login = user.account.content.login;
					console.log('login', login);
					var state = 'carrier:list({login: \'' + login + '\'})';
					console.log('state', state);
					return {
						state: state,
						label: 'Revenir à la liste des transports',
						message: 'Votre transports a bien été supprimé.'
					};
				});
			}
		},
		back: false
	});

}]);

app.controller('CarrierListCtrl', ['$scope', '$injector', function CarrierCtrl($scope, $injector) {
	this.carrier = $injector.get('carrier');
	this.user = $injector.get('user');
	this.$onInit = function() {
		this.carrier.list();
	};
}]);

app.controller('CarrierCtrl', ['$scope', '$injector', function CarrierCtrl($scope, $injector) {
	this.carrier = $injector.get('carrier');
	this.user = $injector.get('user');
	var $stateParams = $injector.get('$stateParams');
	console.log('this.carrier', this.carrier);
	console.log('$stateParams', $stateParams);
	this.$onInit = function() {
		this.carrier.get($stateParams.id);
	};
}]);

app.controller('CarrierUpdateCtrl', ['$scope', '$injector', function CarrierUpdateCtrl($scope, $injector) {
	var self = this;
	this.carrier = $injector.get('carrier');
	this.user = $injector.get('user');
	var $stateParams = $injector.get('$stateParams');
	this.$onInit = function() {
		this.carrier.get($stateParams.id);
		$scope.$watch('$ctrl.carrier.current', function() {
			if (self.carrier.current === undefined) {
				return;
			}
			self.carrier.updateData = angular.copy(self.carrier.current);
			self.carrier.updateData.oldId = $stateParams.id;
			console.log('self.carrier.updateData', self.carrier.updateData);
		});
	};
}]);

var carrierCreateUrl = require('./tmpl/carrier-create.html');
var carrierListUrl = require('./tmpl/carrier-list.html');
var carrierDetailUrl = require('./tmpl/carrier-detail.html');
var carrierUpdateUrl = require('./tmpl/carrier-update.html');

app.component('lgCarrierCreateRoute', {
	templateUrl: carrierCreateUrl,
	controller: 'CarrierCtrl',
});

app.component('lgCarrierListRoute', {
	templateUrl: carrierListUrl,
	controller: 'CarrierListCtrl',
});

app.component('lgCarrierRetrieveRoute', {
	templateUrl: carrierDetailUrl,
	controller: 'CarrierCtrl',
});

app.component('lgCarrierUpdateRoute', {
	templateUrl: carrierUpdateUrl,
	controller: 'CarrierUpdateCtrl',
});

