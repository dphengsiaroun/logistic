import lgCarrierCreatePricingHtml from '../tmpl/carrier-create-pricing.html';

export const lgCarrierCreatePricingRoute = {
	template: lgCarrierCreatePricingHtml,
	controller: function LgCarrierCreatePricingRouteCtrl($state, connection, carrier) {
		'ngInject';
		const ctrl = this;
		if (carrier.type === 'create') {
			ctrl.pricingData = {};
		} else {
			ctrl.pricingData = carrier.createData.pricing;
			
		}
		ctrl.carrier = carrier;
		ctrl.addPricing = function() {
			carrier.createData.pricing = ctrl.pricingData;
			
			if (carrier.type === 'create') {
				$state.go('carrier:create');
			} else {
				$state.go('carrier:' + carrier.type, {login: connection.user.content.login, id: carrier.current.id});
			}
		};
	}
};
