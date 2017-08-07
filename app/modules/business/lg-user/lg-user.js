

import './lg-user.scss';
import 'angular-ui-router';
import 'angular-ui-validate';

import '../../technic/lg-widget/lg-widget.js';

import * as serviceLib from './lg-user-service.js';
import * as lib from './lg-user-route.js';
import * as adsLib from './ctrl/ads.js';
import * as proposalLib from './ctrl/proposals.js';


module.exports = 'lg-user';

const app = angular.module(module.exports, ['ui.router', 'ui.validate', 'lg-widget']);

require('./service/lg-user-validator.js');

app.service('user', serviceLib.User);

app.config(lib.config);
app.controller('UserCtrl', lib.UserCtrl);
app.component('lgUserCreateRoute', lib.lgUserCreateRoute);
app.component('lgUserSignupSuccessRoute', lib.lgUserSignupSuccessRoute);
app.component('lgUserRetrieveRoute', lib.lgUserRetrieveRoute);
app.component('lgUserUpdatePasswordRoute', lib.lgUserUpdatePasswordRoute);
app.component('lgUserInitiatePasswordRoute', lib.lgUserInitiatePasswordRoute);

app.config(adsLib.config);
app.component('lgUserAdsRoute', adsLib.lgUserAdsRoute);

app.config(proposalLib.config);
app.component('lgUserProposalsRoute', proposalLib.lgUserProposalsRoute);

