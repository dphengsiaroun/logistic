import carrierCreateHtml from '../tmpl/carrier-create.html';

export const lgCarrierUpdateRoute = {
	template: carrierCreateHtml,
	controller: function LgCarrierUpdateRouteCtrl($stateParams, user, connection, carrier, carrierStepManager) {
		'ngInject';
		this.carrier = carrier;
		this.carrierStepManager = carrierStepManager;

		this.$onInit = () => {
			connection.waitForCheckConnection('LgCarrierUpdateRouteCtrl').then(() => {
				return this.carrier.get($stateParams.id);
			}).then(() => {
				this.carrier.createData = this.carrier.current.content;
				this.carrier.createData.id = $stateParams.id;
				this.carrier.type = 'update';
			}).catch(function() {
				console.error('you should not see this');
			});
		};

		// ctrl.carrier.createData = ctrl.carrier.current.content;
		// console.log('ctrl.carrier.current', carrier.current);
		// ctrl.carrier.createData.id = ctrl.carrier.current.id;
		// console.log('ctrl.carrier.createData.id', ctrl.carrier.createData.id);

		// ctrl.carrier.type = 'update';
		// console.log('ctrl.carrier.type', ctrl.carrier.type);

	}
};
