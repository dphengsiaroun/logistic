export function CarrierStepManager(carrier) {
	'ngInject';
	this.getStep = function() {
		if (carrier.createData.truck === undefined) {
			return 1;
		}
		if (carrier.createData.availability === undefined) {
			return 2;
		}
		if (carrier.createData.pricing === undefined) {
			return 3;
		}
		return 4;
	};
	this.getClass = function(step) {
		const currentStep = this.getStep();
		
		if (step > currentStep) {
			return {
				disabled: true
			};
		} else if (step === currentStep) {
			return {
				active: true
			};
		} else {
			return {
				done: true
			};
		}
	};

}

