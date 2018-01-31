module.exports = 'admin-carrier';

import * as lib from './admin-carrier-route.js';
import { AdminCarrier } from './admin-carrier.service.js';
import '../widget/export-to-csv/export-to-csv.module.js';

angular.module(module.exports, ['ui.router', 'export-to-csv'])
    .service('adminCarrier', AdminCarrier)
    .config(lib.config)
    .component('adminCarriersRoute', lib.adminCarriersRoute);
