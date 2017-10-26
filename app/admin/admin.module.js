import './admin.scss';
module.exports = 'admin';

import 'angular-sanitize';

import lgDebug from '../modules/technic/lg-debug/lg-debug.service.js';
import lgMisc from '../modules/technic/lg-misc/lg-misc.module.js';
import lgProposal from '../modules/business/lg-proposal/lg-proposal.module.js';
import lgConfig from '../modules/business/lg-config/lg-config.module.js';
import { adminPrompt } from './admin-prompt.component.js';
import { adminConfirm } from './admin-confirm.component.js';
import { AdminConnection } from './service/admin-connection.service.js';
import { AdminUser } from './service/admin-user.service.js';
import { AdminCarrier } from './service/admin-carrier.service.js';
import { AdminLoader } from './service/admin-loader.service.js';
import { AdminProposal } from './service/admin-proposal.service.js';
import * as lib from './admin-route.js';

angular.module(module.exports, ['ui.router', 'ngSanitize', lgProposal, lgConfig, lgMisc, lgDebug])
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
	.component('adminProposalsRoute', lib.adminProposalsRoute)
	.component('adminPrompt', adminPrompt)
	.component('adminConfirm', adminConfirm);
