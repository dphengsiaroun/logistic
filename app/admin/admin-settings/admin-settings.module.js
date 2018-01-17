module.exports = 'admin-settings';

import * as lib from './admin-settings-route.js';

angular.module(module.exports, ['ui.router'])
	.config(lib.config)
	.component('adminUsersRoute', lib.adminUsersRoute);
