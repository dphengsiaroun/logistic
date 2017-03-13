'use strict';

var app = angular.module('lg-carrier');

app.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state({
		name: 'carrier:create',
		url: '/carrier-create',
		component: 'lgCarrierCreateRoute',
	});
	$stateProvider.state({
		name: 'carrier:create:truck:choose',
		url: '/carrier-create/truck-choose',
		component: 'lgCarrierCreateTruckChooseRoute',
	});
	$stateProvider.state({
		name: 'carrier:created',
		url: '/created-carrier',
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
					label: 'Voir les annonces de transport',
					message: 'Votre annonce de transport a bien été ajoutée.'
				};
			}
		},
		needsUser: true
	});


}]);

var carrierCreateUrl = require('./tmpl/carrier-create.html');
app.component('lgCarrierCreateRoute', {
	templateUrl: carrierCreateUrl,
	controller: function LgCarrierCreateRouteCtrl(carrier) {
		'ngInject';
		var ctrl = this;
		ctrl.carrier = carrier;
		ctrl.getStep = function() {
			if (carrier.createData.truck === undefined) {
				return 1;
			}
			if (carrier.createData.availability === undefined) {
				return 2;
			}
			if (carrier.createData.pricing === undefined) {
				return 3;
			}
			return 4;
		};
		ctrl.getClass = function(step) {
			var currentStep = ctrl.getStep();
			console.log('currentStep', currentStep);
			if (step > currentStep) {
				return {disabled: true};
			} else if (step === currentStep) {
				return {active: true};
			} else {
				return {done: true};
			}
		};
	}
});

var carrierCreateTruckChooseUrl = require('./tmpl/carrier-create-truck-choose.html');
app.component('lgCarrierCreateTruckChooseRoute', {
	templateUrl: carrierCreateTruckChooseUrl,
	controller: function LgCarrierCreateTruckChooseRouteCtrl($state, truck, carrier) {
		'ngInject';
		var ctrl = this;
		ctrl.hasTruck = false;
		ctrl.truck = truck;
		truck.empty().then(function() {
			ctrl.hasTruck = true;
		}).catch(function() {
			ctrl.hasTruck = false;
		});
		ctrl.selectTruck = function(t) {
			carrier.createData.truck = t;
			$state.go('carrier:create');
		};
	}
});

require('./ctrl/carrier-create-truck-create.js');
require('./ctrl/carrier-create-availability.js');
require('./ctrl/carrier-create-trip-create.js');
require('./ctrl/carrier-create-pricing.js');
