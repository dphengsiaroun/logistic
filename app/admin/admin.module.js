import 'normalize.css';
import '../css/reset.scss';
import './admin.scss';
module.exports = 'admin';

import 'angular-sanitize';

import adminCarrier from './admin-carrier/admin-carrier.module.js';
import adminConnection from './admin-connection/admin-connection.module.js';
import adminLoader from './admin-loader/admin-loader.module.js';
import adminProposal from './admin-proposal/admin-proposal.module.js';
import adminSettings from './admin-settings/admin-settings.module.js';
import adminUser from './admin-user/admin-user.module.js';

import lgDebug from '../modules/technic/lg-debug/lg-debug.service.js';
import lgMisc from '../modules/technic/lg-misc/lg-misc.module.js';
import lgImgSvg from '../modules/technic/lg-img-svg/lg-img-svg.module.js';
import lgConfig from '../modules/business/lg-config/lg-config.module.js';

import { adminPrompt } from './widget/admin-prompt.component.js';
import { adminConfirm } from './widget/admin-confirm.component.js';

import * as lib from './admin-route.js';
import '../modules/technic/lg-back-detector/lg-back-detector.module.js';


angular.module(module.exports, [
	'ui.router', 
	'ngSanitize',
	adminCarrier,	
	adminConnection,
	adminLoader, 
	adminProposal,
	adminSettings,
	adminUser,
	
	lgConfig, 
	lgMisc,
	lgImgSvg,
	lgDebug,
	'lg-back-detector'
	])
	.config(lib.config)
	.run((adminConnection, lgBackDetector, lgConfig) => {
		console.log('run');
		lgConfig.init();
		adminConnection.check();
		lgBackDetector.init();
	})
	.component('adminNavRoute', lib.adminNavRoute)
	.component('adminFooterRoute', lib.adminFooterRoute)
	.component('adminRoute', lib.adminRoute)
	.component('adminTermsRoute', lib.adminTermsRoute)
	.component('adminPrompt', adminPrompt)
	.component('adminConfirm', adminConfirm);
