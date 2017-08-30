import './lg-password.scss';
module.exports = 'lg-password';

import * as lib from './lg-password-route.js';
import { Password } from './password.service.js';


angular.module(module.exports, [])
	.service('password', Password)
	.config(lib.config)
	.component('lgUserForgottenPasswordRoute', lib.lgUserForgottenPasswordRoute)
	.component('lgUserChooseNewPasswordRoute', lib.lgUserChooseNewPasswordRoute);
