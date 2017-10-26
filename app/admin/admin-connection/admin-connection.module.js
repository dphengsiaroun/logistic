module.exports = 'admin-connection';

import * as lib from './admin-connection-route.js';
import { AdminConnection } from './admin-connection.service.js';

angular.module(module.exports, ['ui.router'])
    .service('adminConnection', AdminConnection)
    .config(lib.config)
    .component('adminLoginRoute', lib.adminLoginRoute);
