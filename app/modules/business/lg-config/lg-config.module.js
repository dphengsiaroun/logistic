module.exports = 'lg-config';

import { LgConfig } from './lg-config.service.js';

angular.module(module.exports, [])
	.service('lgConfig', LgConfig)
	.config(function($sceDelegateProvider, $touchProvider) {
		'ngInject';
		$touchProvider.ngClickOverrideEnabled(true);
		$sceDelegateProvider.resourceUrlWhitelist([
			// Allow same origin resource loads.
			'self',
			// Allow loading from our assets domain.  Notice the difference between * and **.
			'https://www.google.com/**'
		]);
	})
	.run((lgConfig) => {
		lgConfig.wsDir('ws/');
		lgConfig.init();
	});

