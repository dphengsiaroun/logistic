import carrierCreateTruckChooseHtml from '../tmpl/carrier-create-truck-choose.html';
import { breadcrumb } from '../carrier.breadcrumb.js';

export const lgCarrierCreateTruckChooseRoute = {
	template: carrierCreateTruckChooseHtml,
	controller: function LgCarrierCreateTruckChooseRouteCtrl($state, connection, truck, carrier) {
		'ngInject';
		this.breadcrumb = breadcrumb;
		this.hasTruck = false;
		this.truck = truck;
		truck.empty().then(() => {
			this.hasTruck = true;
		}).catch(() => {
			this.hasTruck = false;
		});
		this.selectTruck = (t) => {
			carrier.createData.truck = t;
			if (carrier.type === 'create') {
				$state.go('carrier:create');
			} else {
				$state.go('carrier:' + carrier.type, {login: connection.user.content.login, id: carrier.current.id});
			}
		};
	}
};
