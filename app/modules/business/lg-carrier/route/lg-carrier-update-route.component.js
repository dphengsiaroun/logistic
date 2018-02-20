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
				if (this.carrier.isInitialized()) {
					this.carrier.stepData = this.carrier.current.content;
					this.carrier.stepData.id = $stateParams.id;
					this.carrier.type = 'update';
				}
			}).catch(function() {
				console.error('you should not see this');
			});
		};
	}
};
