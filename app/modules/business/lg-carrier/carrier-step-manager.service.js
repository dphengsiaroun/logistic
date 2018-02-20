export function CarrierStepManager(carrier) {
	'ngInject';
	this.getStep = function() {
		if (carrier.stepData.truck === undefined) {
			return 1;
		}
		if (carrier.stepData.availability === undefined) {
			return 2;
		}
		if (carrier.stepData.pricing === undefined) {
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

