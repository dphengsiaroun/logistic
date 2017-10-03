import './lg-admin.scss';
module.exports = 'lg-admin';


import * as lib from './lg-admin-route.js';
angular.module(module.exports, ['ui.router'])
	.config(lib.config)
	.component('lgAdminRoute', lib.lgAdminRoute);
