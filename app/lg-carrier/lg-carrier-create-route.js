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
		name: 'carrier:create:truck:create',
		url: '/carrier-create/truck-create',
		component: 'lgCarrierCreateTruckCreateRoute',
	});
	$stateProvider.state({
		name: 'carrier:create:availability',
		url: '/carrier-create/availability',
		component: 'lgCarrierCreateAvailabilityRoute',
	});
	$stateProvider.state({
		name: 'carrier:create:trip:create',
		url: '/carrier-create/trip-create',
		component: 'lgCarrierCreateTripCreateRoute',
	});
	$stateProvider.state({
		name: 'carrier:create:loading',
		url: '/carrier-create/loading',
		component: 'lgCarrierCreateLoadingRoute',
	});
	$stateProvider.state({
		name: 'carrier:create:pricing',
		url: '/carrier-create/pricing',
		component: 'lgCarrierCreatePricingRoute',
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
					label: 'Revenir à la liste des chargements',
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
			if (carrier.createData.loading === undefined) {
				return 3;
			}
			if (carrier.createData.pricing === undefined) {
				return 4;
			}
			return 5;
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

var lgCarrierCreateTruckCreateUrl = require('./tmpl/carrier-create-truck-create.html');
app.component('lgCarrierCreateTruckCreateRoute', {
	templateUrl: lgCarrierCreateTruckCreateUrl,
	controller: function LgCarrierCreateTruckCreateRouteCtrl(truck, context) {
		'ngInject';
		var ctrl = this;
		ctrl.truck = truck;
		context.push('carrier:create:truck:choose');
	}
});

var lgCarrierCreateAvailabilityUrl = require('./tmpl/carrier-create-availability.html');
app.component('lgCarrierCreateAvailabilityRoute', {
	templateUrl: lgCarrierCreateAvailabilityUrl,
	controller: function LgCarrierCreateAvailabilityRouteCtrl($state, carrier) {
		'ngInject';
		var ctrl = this;
		ctrl.select = function(str) {
			carrier.createData.availability = str;
			if (str === 'total') {
				$state.go('carrier:create');
			}
			if (str === 'specificTrip') {
				$state.go('carrier:create:trip:create');
			}
		};
	}
});

var lgCarrierCreateTripCreateUrl = require('./tmpl/carrier-create-trip-create.html');
app.component('lgCarrierCreateTripCreateRoute', {
	templateUrl: lgCarrierCreateTripCreateUrl,
	controller: function LgCarrierCreateTripCreateRouteCtrl($state, carrier) {
		'ngInject';
		var ctrl = this;
		ctrl.tripData = {};
		ctrl.addTrip = function() {
			carrier.createData.trip = ctrl.tripData;
			$state.go('carrier:create');
		};
	}
});

var lgCarrierCreateLoadingUrl = require('./tmpl/carrier-create-loading.html');
app.component('lgCarrierCreateLoadingRoute', {
	templateUrl: lgCarrierCreateLoadingUrl,
	controller: function LgCarrierCreateLoadingRouteCtrl($state, carrier) {
		'ngInject';
		var ctrl = this;
		ctrl.loadingData = {};
		ctrl.addLoading = function() {
			carrier.createData.loading = ctrl.loadingData;
			$state.go('carrier:create');
		};
	}
});

var lgCarrierCreatePricingUrl = require('./tmpl/carrier-create-pricing.html');
app.component('lgCarrierCreatePricingRoute', {
	templateUrl: lgCarrierCreatePricingUrl,
	controller: function LgCarrierCreateLoadingRouteCtrl($state, carrier) {
		'ngInject';
		var ctrl = this;
		ctrl.pricingData = {};
		ctrl.addPricing = function() {
			carrier.createData.pricing = ctrl.pricingData;
			$state.go('carrier:create');
		};
	}
});
