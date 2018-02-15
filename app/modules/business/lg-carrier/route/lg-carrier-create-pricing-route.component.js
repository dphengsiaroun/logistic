import lgCarrierCreatePricingHtml from '../tmpl/carrier-create-pricing.html';
import { breadcrumb } from '../carrier.breadcrumb.js';

export const lgCarrierCreatePricingRoute = {
	template: lgCarrierCreatePricingHtml,
	controller: function LgCarrierCreatePricingRouteCtrl($state, connection, carrier, formValidator) {
		'ngInject';
		this.breadcrumb = breadcrumb;
		this.fv = formValidator;
		
		if (carrier.type === 'create') {
			this.pricingData = {};
		} else {
			this.pricingData = carrier.createData.pricing;
			console.log('this.pricingData', this.pricingData);
		}
		this.carrier = carrier;
		this.addPricing = function() {
			carrier.createData.pricing = this.pricingData;
			console.log('carrier.createData.pricingData', carrier.createData.pricingData);			
			if (carrier.type === 'create') {
				$state.go('carrier:create');
			} else {
				$state.go('carrier:' + carrier.type, {login: connection.user.content.login, id: carrier.current.id});
			}
		};
	}
};
