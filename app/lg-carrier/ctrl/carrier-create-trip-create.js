'use strict';

var app = angular.module('lg-carrier');

app.config(function($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'carrier:create:trip:create',
		url: '/carrier-create/trip-create',
		component: 'lgCarrierCreateTripCreateRoute',
	});
});


var lgCarrierCreateTripCreateUrl = require('../tmpl/carrier-create-trip-create.html');
app.component('lgCarrierCreateTripCreateRoute', {
	templateUrl: lgCarrierCreateTripCreateUrl,
	controller: function LgCarrierCreateTripCreateRouteCtrl($scope, $state, carrier, geoloc) {
		'ngInject';
		var ctrl = this;
		ctrl.tripData = {};
		ctrl.addTrip = function() {
			carrier.createData.trip = ctrl.tripData;
			$state.go('carrier:create');
		};

		geoloc.updateInfoRoute($scope, '$ctrl.tripData');

	}
});
