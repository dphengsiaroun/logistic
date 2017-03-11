'use strict';

var app = angular.module('lg-carrier');

app.config(function($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'carrier:create:pricing',
		url: '/carrier-create/pricing',
		component: 'lgCarrierCreatePricingRoute',
	});
});


var lgCarrierCreatePricingUrl = require('../tmpl/carrier-create-pricing.html');
app.component('lgCarrierCreatePricingRoute', {
	templateUrl: lgCarrierCreatePricingUrl,
	controller: function LgCarrierCreatePricingRouteCtrl($state, carrier) {
		'ngInject';
		var ctrl = this;
		ctrl.pricingData = {};
		ctrl.carrier = carrier;
		ctrl.addPricing = function() {
			carrier.createData.pricing = ctrl.pricingData;
			$state.go('carrier:create');
		};
	}
});
