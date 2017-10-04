import './lg-admin.scss';
module.exports = 'lg-admin';


import * as lib from './lg-admin-route.js';
angular.module(module.exports, ['ui.router'])
	.config(lib.config)
	.component('lgAdminNavRoute', lib.lgAdminNavRoute)
	.component('lgAdminRoute', lib.lgAdminRoute)
	.component('lgAdminUsersRoute', lib.lgAdminUsersRoute)
	.component('lgAdminLoadersRoute', lib.lgAdminLoadersRoute)
	.component('lgAdminCarriersRoute', lib.lgAdminCarriersRoute)
	.component('lgAdminTrucksRoute', lib.lgAdminTrucksRoute)
	.component('lgAdminProposalsRoute', lib.lgAdminProposalsRoute);
