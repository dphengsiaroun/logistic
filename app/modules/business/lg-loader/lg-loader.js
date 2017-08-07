import './lg-loader.scss';
module.exports = 'lg-loader';

import * as lib from './lg-loader-route.js';
import { Loader } from './lg-loader-service.js';

angular.module(module.exports, ['ui.router'])
	.service('loader', Loader)
	.config(lib.config)
	.component('lgLoaderCreateRoute', lib.lgLoaderCreateRoute)
	.component('lgLoaderListRoute', lib.lgLoaderListRoute)
	.component('lgLoaderRetrieveRoute', lib.lgLoaderRetrieveRoute)
	.component('lgLoaderUpdateRoute', lib.lgLoaderUpdateRoute)
	;
