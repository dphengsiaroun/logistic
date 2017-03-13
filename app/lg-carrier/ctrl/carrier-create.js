'use strict';

var app = angular.module('lg-carrier');

app.config(function($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'carrier:create',
		url: '/carrier-create',
		component: 'lgCarrierCreateRoute',
	});
});


var carrierCreateUrl = require('../tmpl/carrier-create.html');
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

