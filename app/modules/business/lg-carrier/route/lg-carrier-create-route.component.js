import carrierStepHtml from '../tmpl/carrier-step.html';
export const lgCarrierCreateRoute = {
	template: carrierStepHtml,
	controller: function LgCarrierCreateRouteCtrl(connection, carrier, truck, carrierStepManager) {
		'ngInject';
		const ctrl = this;
		ctrl.carrier = carrier;
		ctrl.truck = truck;
		ctrl.carrierStepManager = carrierStepManager;
		console.log('ctrl.carrierStepManager', ctrl.carrierStepManager);

		if (connection.user) {
			carrier.stepData.phone = connection.user.content.phone;
		}

		console.log('this.carrier.stepData.truck', this.carrier.stepData.truck);
		console.log('this.carrier', this.carrier);

		carrier.type = 'create';

		this.carrier.reinitialize = () => {
			console.log('reinitialize', arguments);
			this.carrier.stepData.truck = undefined;
			this.carrier.stepData.availability = undefined;
			this.carrier.stepData.pricing = undefined;
			console.log('this.carrier.stepData', this.carrier.stepData);
		};
	}
};