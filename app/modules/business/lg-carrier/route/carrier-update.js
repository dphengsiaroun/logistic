import carrierCreateHtml from '../tmpl/carrier-create.html';
export const lgCarrierUpdateRoute = {
	template: carrierCreateHtml,
	controller: function LgCarrierUpdateRouteCtrl(user, carrier, carrierStepManager) {
		'ngInject';
		const ctrl = this;
		ctrl.carrier = carrier;
		ctrl.carrierStepManager = carrierStepManager;
		carrier.createData = carrier.current.content;
		carrier.createData.id = carrier.current.id;
		carrier.type = 'update';
	}
};

