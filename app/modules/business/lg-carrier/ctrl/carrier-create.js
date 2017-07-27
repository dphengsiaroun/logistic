const app = angular.module('lg-carrier');

app.config(function($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'carrier:create',
		url: '/carrier-create',
		component: 'lgCarrierCreateRoute',
	});
	$stateProvider.state({
		name: 'carrier:update',
		url: '/carrier/{id}/update',
		component: 'lgCarrierUpdateRoute'
	});
});

app.service('carrierStepManager', function CarrierStepManager(carrier) {
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
		console.log('currentStep', currentStep);
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

});


const carrierCreateUrl = require('../tmpl/carrier-create.html');
app.component('lgCarrierCreateRoute', {
	template: carrierCreateUrl,
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
});

app.component('lgCarrierUpdateRoute', {
	template: carrierCreateUrl,
	controller: function LgCarrierUpdateRouteCtrl(user, carrier, carrierStepManager) {
		'ngInject';
		const ctrl = this;
		ctrl.carrier = carrier;
		ctrl.carrierStepManager = carrierStepManager;
		carrier.createData = carrier.current.content;
		carrier.createData.id = carrier.current.id;
		carrier.type = 'update';
	}
});
