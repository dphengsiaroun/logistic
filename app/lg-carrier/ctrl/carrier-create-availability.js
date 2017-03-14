'use strict';

var app = angular.module('lg-carrier');

app.config(function($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'carrier:create:availability',
		url: '/carrier-create/availability',
		component: 'lgCarrierCreateAvailabilityRoute',
	});
});


var lgCarrierCreateAvailabilityUrl = require('../tmpl/carrier-create-availability.html');
app.component('lgCarrierCreateAvailabilityRoute', {
	templateUrl: lgCarrierCreateAvailabilityUrl,
	controller: function LgCarrierCreateAvailabilityRouteCtrl($state, user, carrier) {
		'ngInject';
		var ctrl = this;
		ctrl.select = function(str) {
			carrier.createData.availability = str;
			if (str === 'total') {
				if (carrier.type === 'create') {
					$state.go('carrier:create');
				} else {
					$state.go('carrier:' + carrier.type, {login: user.account.content.login, id: carrier.current.id});
				}
			}
			if (str === 'specificTrip') {
				$state.go('carrier:create:trip:create');
			}
		};
	}
});
