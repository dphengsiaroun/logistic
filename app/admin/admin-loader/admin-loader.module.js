module.exports = 'admin-loader';

import * as lib from './admin-loader-route.js';
import { AdminLoader } from './admin-loader.service.js';

angular.module(module.exports, ['ui.router'])
    .service('adminLoader', AdminLoader)
    .config(lib.config)
    .component('adminLoadersRoute', lib.adminLoadersRoute);
