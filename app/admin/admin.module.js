import './admin.scss';
module.exports = 'admin';

import lgConnection from '../modules/business/lg-connection/lg-connection.module.js';
import lgProposal from '../modules/business/lg-proposal/lg-proposal.module.js';
import lgConfig from '../modules/business/lg-config/lg-config.module.js';

import * as lib from './admin-route.js';
angular.module(module.exports, ['ui.router', lgConnection, lgProposal, lgConfig])
	.config(lib.config)
	.component('adminNavRoute', lib.adminNavRoute)
	.component('adminRoute', lib.adminRoute)
	.component('adminUsersRoute', lib.adminUsersRoute)
	.component('adminLoadersRoute', lib.adminLoadersRoute)
	.component('adminCarriersRoute', lib.adminCarriersRoute)
	.component('adminTrucksRoute', lib.adminTrucksRoute)
	.component('adminProposalsRoute', lib.adminProposalsRoute);
