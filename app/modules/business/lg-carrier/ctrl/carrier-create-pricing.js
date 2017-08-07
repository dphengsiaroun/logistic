import lgCarrierCreatePricingHtml from '../tmpl/carrier-create-pricing.html';
export const lgCarrierCreatePricingRoute = {
	template: lgCarrierCreatePricingHtml,
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
};
