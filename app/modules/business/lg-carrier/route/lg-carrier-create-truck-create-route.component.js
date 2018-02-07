import lgCarrierCreateTruckCreateHtml from '../tmpl/carrier-create-truck-create.html';
import { breadcrumb } from '../carrier.breadcrumb.js';

export const lgCarrierCreateTruckCreateRoute = {
	template: lgCarrierCreateTruckCreateHtml,
	controller: function LgCarrierCreateTruckCreateRouteCtrl(truck, context, formValidator) {
		'ngInject';
		this.breadcrumb = breadcrumb;
		this.truck = truck;
		this.fv = formValidator;
		context.push('carrier:create:truck:choose');
	}
};
