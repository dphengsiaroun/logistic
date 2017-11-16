import carrierCreateHtml from '../tmpl/carrier-create.html';
export const lgCarrierCreateRoute = {
	template: carrierCreateHtml,
	controller: function LgCarrierCreateRouteCtrl(connection, carrier, carrierStepManager) {
		'ngInject';
		const ctrl = this;
		ctrl.carrier = carrier;
		ctrl.carrierStepManager = carrierStepManager;
		if (connection.user) {
			carrier.createData.phone = connection.user.content.phone;
		}

		carrier.type = 'create';
	}
};