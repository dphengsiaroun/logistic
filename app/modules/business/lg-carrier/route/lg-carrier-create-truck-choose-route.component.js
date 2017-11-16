import carrierCreateTruckChooseHtml from '../tmpl/carrier-create-truck-choose.html';

export const lgCarrierCreateTruckChooseRoute = {
	template: carrierCreateTruckChooseHtml,
	controller: function LgCarrierCreateTruckChooseRouteCtrl($state, connection, truck, carrier) {
		'ngInject';
		const ctrl = this;
		ctrl.hasTruck = false;
		ctrl.truck = truck;
		truck.empty().then(function() {
			ctrl.hasTruck = true;
		}).catch(function() {
			ctrl.hasTruck = false;
		});
		ctrl.selectTruck = function(t) {
			carrier.createData.truck = t;
			if (carrier.type === 'create') {
				$state.go('carrier:create');
			} else {
				$state.go('carrier:' + carrier.type, {login: connection.user.content.login, id: carrier.current.id});
			}
		};
	}
};
