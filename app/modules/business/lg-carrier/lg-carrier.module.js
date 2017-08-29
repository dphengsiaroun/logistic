import './lg-carrier.scss';
module.exports = 'lg-carrier';

import { Carrier } from './carrier.service.js';
import { CarrierStepManager } from './carrier-step-manager.service.js';

import * as lib from './lg-carrier-route.js';
import * as createLib from './lg-carrier-create-route.js';

import { lgCarrierListRoute } from './route/carrier-list.js';
import { lgCarrierRetrieveRoute } from './route/carrier-retrieve.js';

import { lgCarrierCreateAvailabilityRoute } from './route/carrier-create-availability.js';
import { lgCarrierCreatePricingRoute } from './route/carrier-create-pricing.js';
import { lgCarrierCreateTripCreateRoute } from './route/carrier-create-trip-create.js';
import { lgCarrierCreateTruckChooseRoute } from './route/carrier-create-truck-choose.js';
import { lgCarrierCreateTruckCreateRoute } from './route/carrier-create-truck-create.js';
import { lgCarrierCreateRoute } from './route/carrier-create.js';
import { lgCarrierUpdateRoute } from './route/carrier-update.js';

angular.module(module.exports, ['ui.router'])

	.service('carrier', Carrier)
	.service('carrierStepManager', CarrierStepManager)


	.config(lib.config)
	

	.config(createLib.config)

	.component('lgCarrierListRoute', lgCarrierListRoute)
	.component('lgCarrierRetrieveRoute', lgCarrierRetrieveRoute)

	.component('lgCarrierCreateAvailabilityRoute', lgCarrierCreateAvailabilityRoute)
	.component('lgCarrierCreatePricingRoute', lgCarrierCreatePricingRoute)
	.component('lgCarrierCreateTripCreateRoute', lgCarrierCreateTripCreateRoute)
	.component('lgCarrierCreateTruckChooseRoute', lgCarrierCreateTruckChooseRoute)
	.component('lgCarrierCreateTruckCreateRoute', lgCarrierCreateTruckCreateRoute)
	.component('lgCarrierCreateRoute', lgCarrierCreateRoute)
	.component('lgCarrierUpdateRoute', lgCarrierUpdateRoute);
