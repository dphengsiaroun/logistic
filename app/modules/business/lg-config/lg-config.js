module.exports = 'lg-config';

import { LgConfig } from './lg-config.service.js';

angular.module(module.exports, [])
	.service('lgConfig', LgConfig)
	.run((lgConfig) => {
		lgConfig.init();
	});
