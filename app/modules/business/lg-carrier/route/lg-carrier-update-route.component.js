import carrierStepHtml from '../tmpl/carrier-step.html';

export const lgCarrierUpdateRoute = {
	template: carrierStepHtml,
	controller: function LgCarrierUpdateRouteCtrl($stateParams, user, connection, carrier, carrierStepManager) {
		'ngInject';
		this.carrier = carrier;
		this.carrierStepManager = carrierStepManager;

		this.$onInit = () => {
			connection.waitForCheckConnection('LgCarrierUpdateRouteCtrl').then(() => {
				return this.carrier.get($stateParams.id);
			}).then(() => {
				this.carrier.stepData = this.carrier.current.content;
				this.carrier.stepData.id = $stateParams.id;
				this.carrier.type = 'update';
			}).catch(function() {
				console.error('you should not see this');
			});
		};

		// ctrl.carrier.stepData = ctrl.carrier.current.content;
		// console.log('ctrl.carrier.current', carrier.current);
		// ctrl.carrier.stepData.id = ctrl.carrier.current.id;
		// console.log('ctrl.carrier.stepData.id', ctrl.carrier.stepData.id);

		// ctrl.carrier.type = 'update';
		// console.log('ctrl.carrier.type', ctrl.carrier.type);

	}
};
