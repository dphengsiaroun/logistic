module.exports = 'admin-user';

import * as lib from './admin-user-route.js';
import { AdminUser } from './admin-user.service.js';

angular.module(module.exports, ['ui.router'])
    .service('adminUser', AdminUser)
    .config(lib.config)
    .component('adminUsersRoute', lib.adminUsersRoute);