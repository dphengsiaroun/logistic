'use strict';

var app = angular.module('lg-carrier');

app.config(function($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'carrier:create',
		url: '/carrier-create',
		component: 'lgCarrierCreateRoute',
	});
	$stateProvider.state({
		name: 'carrier:update',
		url: '/carrier/{id}/update',
		component: 'lgCarrierUpdateRoute'
	});
});

app.service('carrierStepManager', function CarrierStepManager(carrier) {
	'ngInject';
	this.getStep = function() {
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
	this.getClass = function(step) {
		var currentStep = this.getStep();
		console.log('currentStep', currentStep);
		if (step > currentStep) {
			return {disabled: true};
		} else if (step === currentStep) {
			return {active: true};
		} else {
			return {done: true};
		}
	};

});


var carrierCreateUrl = require('../tmpl/carrier-create.html');
app.component('lgCarrierCreateRoute', {
	templateUrl: carrierCreateUrl,
	controller: function LgCarrierCreateRouteCtrl(carrier, carrierStepManager) {
		'ngInject';
		var ctrl = this;
		ctrl.carrier = carrier;
		ctrl.carrierStepManager = carrierStepManager;
		carrier.type = 'create';
	}
});

app.component('lgCarrierUpdateRoute', {
	templateUrl: carrierCreateUrl,
	controller: function LgCarrierUpdateRouteCtrl(user, carrier, carrierStepManager) {
		'ngInject';
		var ctrl = this;
		ctrl.carrier = carrier;
		ctrl.carrierStepManager = carrierStepManager;
		carrier.createData = carrier.current.content;
		carrier.type = 'update';
	}
});

