import { Connection } from './connection.service.js';
import * as lib from './lg-connection-route.js';


module.exports = 'lg-connection';

import lgUser from '../lg-user/lg-user.module.js';

angular.module(module.exports, [lgUser])
	.config(lib.config)
	.component('lgConnectionSigninRoute', lib.lgConnectionSigninRoute)
	.service('connection', Connection)
;
