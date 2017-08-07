import lgCarrierCreateTruckCreateHtml from '../tmpl/carrier-create-truck-create.html';
export const lgCarrierCreateTruckCreateRoute = {
	template: lgCarrierCreateTruckCreateHtml,
	controller: function LgCarrierCreateTruckCreateRouteCtrl(truck, context, formValidator) {
		'ngInject';
		const ctrl = this;
		ctrl.truck = truck;
		ctrl.fv = formValidator;
		context.push('carrier:create:truck:choose');
	}
};
