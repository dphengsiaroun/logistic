import carrierCreateTruckChooseHtml from '../tmpl/carrier-create-truck-choose.html';
import { breadcrumb } from '../carrier.breadcrumb.js';

export const lgCarrierCreateTruckChooseRoute = {
	template: carrierCreateTruckChooseHtml,
	controller: function LgCarrierCreateTruckChooseRouteCtrl($state, $stateParams, connection, truck, carrier) {
		'ngInject';
		this.breadcrumb = breadcrumb;
		this.hasTruck = false;
		this.truck = truck;

		truck.empty().then(() => {
			this.hasTruck = true;
			console.log(this.hasTruck);
		}).catch(() => {
			this.hasTruck = false;
			console.log(this.hasTruck);			
		});

		this.selectTruck = (t) => {
			carrier.stepData.truck = t;
			if (carrier.type === 'create' || carrier.type === undefined) {
				console.log('carrier.type', carrier.type);				
				$state.go('carrier:create');
			} else {
				console.log('carrier.type', carrier.type);
				$state.go('carrier:' + carrier.type, {login: connection.user.content.login, id: carrier.stepData.truck.id});
			}
		};
	}
};
