var app = angular.module('lg-carrier');

app.config(function($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'carrier:create:truck:choose',
		url: '/carrier-create/truck-choose',
		component: 'lgCarrierCreateTruckChooseRoute',
	});
});


var carrierCreateTruckChooseUrl = require('../tmpl/carrier-create-truck-choose.html');
app.component('lgCarrierCreateTruckChooseRoute', {
	templateUrl: carrierCreateTruckChooseUrl,
	controller: function LgCarrierCreateTruckChooseRouteCtrl($state, user, truck, carrier) {
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
			if (carrier.type === 'create') {
				$state.go('carrier:create');
			} else {
				$state.go('carrier:' + carrier.type, {login: user.current.content.login, id: carrier.current.id});
			}
		};
	}
});
