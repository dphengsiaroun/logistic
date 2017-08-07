import './lg-truck.scss';
module.exports = 'lg-truck';


import * as lib from './lg-truck-route.js';
import * as serviceLib from './lg-truck-service.js';
angular.module(module.exports, ['ui.router'])
	.config(lib.config)
	.component('lgTruckCreateRoute', lib.lgTruckCreateRoute)
	.component('lgTruckListRoute', lib.lgTruckListRoute)
	.component('lgTruckRetrieveRoute', lib.lgTruckRetrieveRoute)
	.component('lgTruckUpdateRoute', lib.lgTruckUpdateRoute)
	.service('truck', serviceLib.Truck);
