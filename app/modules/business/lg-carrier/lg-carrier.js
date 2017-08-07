import './lg-carrier.scss';
module.exports = 'lg-carrier';

import * as serviceLib from './service/lg-carrier-service.js';
import * as carrierCreateLib from './service/carrier-create.js';

import * as lib from './lg-carrier-route.js';
import * as createLib from './lg-carrier-create-route.js';

import * as availabilityLib from './ctrl/carrier-create-availability.js';
import * as createPricingLib from './ctrl/carrier-create-pricing.js';
import * as tripCreateLib from './ctrl/carrier-create-trip-create.js';
import * as chooseLib from './ctrl/carrier-create-truck-choose.js';
import * as truckCreateLib from './ctrl/carrier-create-truck-create.js';

angular.module(module.exports, ['ui.router'])

	.service('carrier', serviceLib.Carrier)

	.config(carrierCreateLib.config)
	.service('carrierStepManager', carrierCreateLib.CarrierStepManager)
	.component('lgCarrierCreateRoute', carrierCreateLib.lgCarrierCreateRoute)
	.component('lgCarrierUpdateRoute', carrierCreateLib.lgCarrierUpdateRoute)

	.config(lib.config)
	.component('lgCarrierListRoute', lib.lgCarrierListRoute)
	.component('lgCarrierRetrieveRoute', lib.lgCarrierRetrieveRoute)

	.config(createLib.config)

	.component('lgCarrierCreateAvailabilityRoute', availabilityLib.lgCarrierCreateAvailabilityRoute)
	.component('lgCarrierCreatePricingRoute', createPricingLib.lgCarrierCreatePricingRoute)
	.component('lgCarrierCreateTripCreateRoute', tripCreateLib.lgCarrierCreateTripCreateRoute)
	.component('lgCarrierCreateTruckChooseRoute', chooseLib.lgCarrierCreateTruckChooseRoute)
	.component('lgCarrierCreateTruckCreateRoute', truckCreateLib.lgCarrierCreateTruckCreateRoute)
	
	;

