module.exports = 'admin-user';

import * as lib from './admin-user-route.js';
import { AdminUser } from './admin-user.service.js';
import '../widget/export-to-csv/export-to-csv.module.js';

angular.module(module.exports, ['ui.router', 'export-to-csv'])
	.service('adminUser', AdminUser)
	.config(lib.config)
	.component('adminUsersRoute', lib.adminUsersRoute);
