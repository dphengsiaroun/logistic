import lgCarrierCreateTruckCreateHtml from '../tmpl/carrier-create-truck-create.html';
import { breadcrumb } from '../carrier.breadcrumb.js';

export const lgCarrierCreateTruckCreateRoute = {
	template: lgCarrierCreateTruckCreateHtml,
	controller: function LgCarrierCreateTruckCreateRouteCtrl(
		$state, truck, connection, carrier, context, formValidator) {
		'ngInject';
		this.breadcrumb = breadcrumb;
		this.truck = truck;
		this.fv = formValidator;

		this.create = (createData) => {
			console.log('create', createData);
			context.push('carrier:create');
			carrier.stepData.truck = createData;
			this.truck.create(createData);
		};
	}
};
