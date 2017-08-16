

import './lg-user.scss';
import 'angular-ui-router';
import 'angular-ui-validate';

import '../../technic/lg-widget/lg-widget.js';

import * as serviceLib from './service/lg-user-service.js';
import * as validatorLib from './service/lg-user-validator.js';
import * as lib from './lg-user-route.js';

import * as adsLib from './ctrl/ads.js';
import * as proposalLib from './ctrl/proposals.js';

module.exports = 'lg-user';

angular.module(module.exports, ['ui.router', 'ui.validate', 'lg-widget', 'lg-connection'])
	.service('user', serviceLib.User)
	.service('userValidator', validatorLib.UserValidator)
	.config(lib.config)
	.controller('UserCtrl', lib.UserCtrl)
	.component('lgUserCreateRoute', lib.lgUserCreateRoute)
	.component('lgUserSignupSuccessRoute', lib.lgUserSignupSuccessRoute)
	.component('lgUserRetrieveRoute', lib.lgUserRetrieveRoute)
	.component('lgUserUpdatePasswordRoute', lib.lgUserUpdatePasswordRoute)
	.component('lgUserInitiatePasswordRoute', lib.lgUserInitiatePasswordRoute)
	.config(adsLib.config)
	.component('lgUserAdsRoute', adsLib.lgUserAdsRoute)
	.config(proposalLib.config)
	.component('lgUserProposalsRoute', proposalLib.lgUserProposalsRoute);

