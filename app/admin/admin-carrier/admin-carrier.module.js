module.exports = 'admin-carrier';

import * as lib from './admin-carrier-route.js';
import { AdminCarrier } from './admin-carrier.service.js';

angular.module(module.exports, ['ui.router'])
    .service('adminCarrier', AdminCarrier)
    .config(lib.config)
    .component('adminCarriersRoute', lib.adminCarriersRoute);
