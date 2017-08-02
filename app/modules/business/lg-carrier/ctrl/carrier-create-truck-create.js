const app = angular.module('lg-carrier');

app.config(function($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'carrier:create:truck:create',
		url: '/carrier-create/truck-create',
		component: 'lgCarrierCreateTruckCreateRoute',
	});
});


const lgCarrierCreateTruckCreateHtml = require('../tmpl/carrier-create-truck-create.html');
app.component('lgCarrierCreateTruckCreateRoute', {
	template: lgCarrierCreateTruckCreateHtml,
	controller: function LgCarrierCreateTruckCreateRouteCtrl(truck, context, formValidator) {
		'ngInject';
		const ctrl = this;
		ctrl.truck = truck;
		ctrl.fv = formValidator;
		context.push('carrier:create:truck:choose');
	}
});
