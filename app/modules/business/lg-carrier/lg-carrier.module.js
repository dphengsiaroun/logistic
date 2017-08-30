import './lg-carrier.scss';
module.exports = 'lg-carrier';

import { Carrier } from './carrier.service.js';
import { CarrierStepManager } from './carrier-step-manager.service.js';

import * as lib from './lg-carrier-route.js';
import * as createLib from './lg-carrier-create-route.js';

import { lgCarrierListRoute } from './route/lg-carrier-list-route.component.js';
import { lgCarrierRetrieveRoute } from './route/lg-carrier-retrieve-route.component.js';

import { lgCarrierCreateAvailabilityRoute } from './route/lg-carrier-create-availability-route.component.js';
import { lgCarrierCreatePricingRoute } from './route/lg-carrier-create-pricing-route.component.js';
import { lgCarrierCreateTripCreateRoute } from './route/lg-carrier-create-trip-create-route.component.js';
import { lgCarrierCreateTruckChooseRoute } from './route/lg-carrier-create-truck-choose-route.component.js';
import { lgCarrierCreateTruckCreateRoute } from './route/lg-carrier-create-truck-create-route.component.js';
import { lgCarrierCreateRoute } from './route/lg-carrier-create-route.component.js';
import { lgCarrierUpdateRoute } from './route/lg-carrier-update-route.component.js';

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
