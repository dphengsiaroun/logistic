import carrierCreateHtml from '../tmpl/carrier-create.html';
export const lgCarrierCreateRoute = {
	template: carrierCreateHtml,
	controller: function LgCarrierCreateRouteCtrl(user, carrier, carrierStepManager) {
		'ngInject';
		const ctrl = this;
		ctrl.carrier = carrier;
		ctrl.carrierStepManager = carrierStepManager;
		if (user.current) {
			carrier.createData.phone = user.current.content.phone;
		}

		carrier.type = 'create';
	}
};