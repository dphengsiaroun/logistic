var app = angular.module('lg-carrier');

app.config(function($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'carrier:create:truck:create',
		url: '/carrier-create/truck-create',
		component: 'lgCarrierCreateTruckCreateRoute',
	});
});


var lgCarrierCreateTruckCreateUrl = require('../tmpl/carrier-create-truck-create.html');
app.component('lgCarrierCreateTruckCreateRoute', {
	templateUrl: lgCarrierCreateTruckCreateUrl,
	controller: function LgCarrierCreateTruckCreateRouteCtrl(truck, context) {
		'ngInject';
		var ctrl = this;
		ctrl.truck = truck;
		context.push('carrier:create:truck:choose');
	}
});
