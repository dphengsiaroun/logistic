import './admin.scss';
module.exports = 'admin';


import * as lib from './admin-route.js';
angular.module(module.exports, ['ui.router'])
	.config(lib.config)
	.component('adminNavRoute', lib.adminNavRoute)
	.component('adminRoute', lib.adminRoute)
	.component('adminUsersRoute', lib.adminUsersRoute)
	.component('adminUsersUpdateRoute', lib.adminUsersUpdateRoute)
	.component('adminLoadersRoute', lib.adminLoadersRoute)
	.component('adminCarriersRoute', lib.adminCarriersRoute)
	.component('adminTrucksRoute', lib.adminTrucksRoute)
	.component('adminProposalsRoute', lib.adminProposalsRoute);
