const app = angular.module('lg-carrier');

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
	controller: function LgCarrierCreateTripCreateRouteCtrl($scope, $state, user, carrier, geoloc) {
		'ngInject';
		var ctrl = this;
		if (carrier.type === 'create') {
			ctrl.tripData = {};
		} else {
			ctrl.tripData = carrier.createData.trip;
			console.log('ctrl.tripData', ctrl.tripData);
		}
		ctrl.addTrip = function() {
			carrier.createData.trip = ctrl.tripData;
			console.log('carrier', carrier);
			if (carrier.type === 'create') {
				$state.go('carrier:create');
			} else {
				$state.go('carrier:' + carrier.type, {login: user.current.content.login, id: carrier.current.id});
			}
		};

		geoloc.updateInfoRoute($scope, '$ctrl.tripData');

	}
});
