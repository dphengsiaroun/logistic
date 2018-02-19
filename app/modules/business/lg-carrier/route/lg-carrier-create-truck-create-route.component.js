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

		this.selectTruck = (t) => {
			carrier.stepData.truck = t;
			if (carrier.type === 'create' || carrier.type === undefined) {
				$state.go('carrier:create');
			} else {
				$state.go('carrier:' + carrier.type, 
					{login: connection.user.content.login, id: carrier.stepData.truck.id});
			}
		};

		this.create = (createData) => {
			console.log('create', createData);
			this.truck.create(createData);
			this.selectTruck(createData);
			context.push('carrier:create');
		};
	}
};
