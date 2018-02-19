import carrierStepHtml from '../tmpl/carrier-step.html';
export const lgCarrierCreateRoute = {
	template: carrierStepHtml,
	controller: function LgCarrierCreateRouteCtrl(connection, carrier, carrierStepManager) {
		'ngInject';
		const ctrl = this;
		ctrl.carrier = carrier;
		ctrl.carrierStepManager = carrierStepManager;
		if (connection.user) {
			carrier.stepData.phone = connection.user.content.phone;
		}

		carrier.type = 'create';

		this.carrier.reinitialize = () => {
			console.log('reinitialize', arguments);
			this.carrier.stepData.truck = undefined;
			console.log('this.carrier.stepData', this.carrier.stepData);
		};
	}
};