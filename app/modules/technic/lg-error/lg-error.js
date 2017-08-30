module.exports = 'lg-error';

import { messageFilter } from './message.filter.js';
import { LgError } from './lg-error.component.js';

angular.module(module.exports, [])
	.filter('message', messageFilter)
	.component('lgError', LgError);
