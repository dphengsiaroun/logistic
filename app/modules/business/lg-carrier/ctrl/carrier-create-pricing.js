const app = angular.module('lg-carrier');

app.config(function($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'carrier:create:pricing',
		url: '/carrier-create/pricing',
		component: 'lgCarrierCreatePricingRoute',
	});
});


const lgCarrierCreatePricingUrl = require('../tmpl/carrier-create-pricing.html');
app.component('lgCarrierCreatePricingRoute', {
	templateUrl: lgCarrierCreatePricingUrl,
	controller: function LgCarrierCreatePricingRouteCtrl($state, user, carrier) {
		'ngInject';
		const ctrl = this;
		if (carrier.type === 'create') {
			ctrl.pricingData = {};
		} else {
			ctrl.pricingData = carrier.createData.pricing;
			console.log('ctrl.pricingData', ctrl.pricingData);
		}
		ctrl.carrier = carrier;
		ctrl.addPricing = function() {
			carrier.createData.pricing = ctrl.pricingData;
			console.log('carrier', carrier);
			if (carrier.type === 'create') {
				$state.go('carrier:create');
			} else {
				$state.go('carrier:' + carrier.type, {login: user.current.content.login, id: carrier.current.id});
			}
		};
	}
});
