'use strict';

var app = angular.module('lg-carrier');

app.config(['$stateProvider', function($stateProvider) {

		$stateProvider.state({
		name: 'carrier:list',
		url: '/ads/carriers',
		component: 'lgCarrierListRoute'
	});
	$stateProvider.state({
		name: 'carrier:retrieve',
		url: '/carrier/{id}',
		component: 'lgCarrierRetrieveRoute',
		needsUser: true
	});
	$stateProvider.state({
		name: 'carrier:create',
		url: '/create-carrier',
		component: 'lgCarrierCreateRoute',
	});
	$stateProvider.state({
		name: 'carrier:created',
		url: '/create-carriers',
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
					label: 'Revenir à la liste des chargements',
					message: 'Votre annonce de transport a bien été ajoutée.'
				};
			}
		},
		needsUser: true,
		back: false
	});
	$stateProvider.state({
		name: 'carrier:update',
		url: '/carrier/{id}/update',
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
						label: 'Revenir à la liste des chargements',
						message: 'Votre annonce de transport a bien été modifiée.'
					};
				});
			}
		}
	});
	$stateProvider.state({
		name: 'carrier:delete',
		url: '/carrier/{id}/delete',
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
				result.confirmationMsg = 'Voulez-vous vraiment supprimer cette annonce de transport&nbsp;?';
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
						label: 'Revenir à la liste des chargements',
						message: 'Votre annonce de transport a bien été supprimée.'
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
	var ctrl = this;
	ctrl.carrier = $injector.get('carrier');
	ctrl.user = $injector.get('user');
	ctrl.isEditable = false;
	var $stateParams = $injector.get('$stateParams');
	console.log('ctrl.carrier', ctrl.carrier);
	console.log('$stateParams', $stateParams);
	ctrl.$onInit = function() {
		ctrl.carrier.get($stateParams.id).then(function() {
			return ctrl.user.waitForCheckConnection();
		}).then(function() {
			ctrl.isEditable = (ctrl.carrier.current.content.accountId === ctrl.user.account.id);
			console.log('ctrl.isEditable', ctrl.isEditable);
		});
	};
}]);

app.controller('CarrierCreateCtrl', function CarrierCreateCtrl($scope, $injector) {
	'ngInject';
	this.carrier = $injector.get('carrier');
	this.user = $injector.get('user');
});

app.controller('CarrierUpdateCtrl', function CarrierUpdateCtrl($scope, carrier, user, $stateParams) {
	'ngInject';
	var ctrl = this;
	ctrl.carrier = carrier;
	ctrl.user = user;
	this.$onInit = function() {
		this.carrier.get($stateParams.id).then(function() {
			return ctrl.user.waitForCheckConnection();
		}).then(function() {
			ctrl.carrier.updateData = angular.copy(ctrl.carrier.current.content);
			ctrl.carrier.updateData.id = $stateParams.id;
			console.log('ctrl.carrier.updateData', ctrl.carrier.updateData);
		});
	};
});

var carrierCreateUrl = require('./tmpl/carrier-create.html');
var carrierListUrl = require('./tmpl/carrier-list.html');
var carrierDetailUrl = require('./tmpl/carrier-detail.html');
var carrierUpdateUrl = require('./tmpl/carrier-update.html');

app.component('lgCarrierCreateRoute', {
	templateUrl: carrierCreateUrl,
	controller: 'CarrierCreateCtrl',
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

