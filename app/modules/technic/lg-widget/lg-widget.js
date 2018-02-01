module.exports = 'lg-widget';
import './lg-widget.scss';

import { lgHr } from './lg-hr.component.js';
import { lgPrompt } from './lg-prompt.component.js';
import { lgConfirm } from './lg-confirm.component.js';
import { lgMessage } from './lg-message.component.js';
import { lgFooter } from './lg-footer.component.js';
import { lgSelect } from './lg-select.component.js';
import { lgCity } from './lg-city.component.js';
import { lgBindHtmlCompile } from './lg-bind-html-compile.directive.js';
import { lgSocialLogin } from './lg-social-login.component.js';
import { lgBreadcrumb } from './lg-breadcrumb.component.js';

angular.module(module.exports, [])
	.component('lgHr', lgHr)
	.component('lgPrompt', lgPrompt)
	.component('lgConfirm', lgConfirm)
	.component('lgMessage', lgMessage)
	.component('lgFooter', lgFooter)
	.component('lgSelect', lgSelect)
	.component('lgCity', lgCity)
	.directive('lgBindHtmlCompile', lgBindHtmlCompile)
	.component('lgSocialLogin', lgSocialLogin)
	.component('lgBreadcrumb', lgBreadcrumb);
