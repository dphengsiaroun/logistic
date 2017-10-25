import './admin.scss';
module.exports = 'admin';

import lgMisc from '../modules/technic/lg-misc/lg-misc.module.js';
import lgProposal from '../modules/business/lg-proposal/lg-proposal.module.js';
import lgConfig from '../modules/business/lg-config/lg-config.module.js';
import { AdminConnection } from './service/admin-connection.service.js';
import { AdminUser } from './service/admin-user.service.js';
import { AdminCarrier } from './service/admin-carrier.service.js';
import { AdminLoader } from './service/admin-loader.service.js';
import { AdminProposal } from './service/admin-proposal.service.js';

import * as lib from './admin-route.js';
angular.module(module.exports, ['ui.router', lgProposal, lgConfig, lgMisc])
	.config(lib.config)
	.run((adminConnection) => {
		console.log('run');
		adminConnection.check();
	})
	.service('adminConnection', AdminConnection)
	.service('adminUser', AdminUser)
	.service('adminCarrier', AdminCarrier)
	.service('adminLoader', AdminLoader)
	.service('adminProposal', AdminProposal)
	.component('adminNavRoute', lib.adminNavRoute)
	.component('adminRoute', lib.adminRoute)
	.component('adminLoginRoute', lib.adminLoginRoute)
	.component('adminUsersRoute', lib.adminUsersRoute)
	.component('adminLoadersRoute', lib.adminLoadersRoute)
	.component('adminCarriersRoute', lib.adminCarriersRoute)
	.component('adminProposalsRoute', lib.adminProposalsRoute);
