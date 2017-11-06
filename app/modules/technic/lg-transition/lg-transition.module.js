module.exports = 'lg-transition';

import '../lg-back-detector/lg-back-detector.module.js';
import '../lg-mobile/lg-mobile.module.js';
import { LgTransition } from './lg-transition.service.js';

angular.module(module.exports, ['lg-back-detector', 'lg-mobile'])
	.service('lgTransition', LgTransition)
	.run(function(lgTransition) {
		lgTransition.init();
	});
