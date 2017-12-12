module.exports = 'admin-loader';

import * as lib from './admin-loader-route.js';
import { AdminLoader } from './admin-loader.service.js';
import '../widget/export-to-csv/export-to-csv.directive.js';

angular.module(module.exports, ['ui.router', 'export-to-csv'])
    .service('adminLoader', AdminLoader)
    .config(lib.config)
    .component('adminLoadersRoute', lib.adminLoadersRoute);
