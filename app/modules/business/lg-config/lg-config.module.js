module.exports = 'lg-config';

import { LgConfigProvider } from './lg-config.service.js';

angular.module(module.exports, [])
	.provider('lgConfig', LgConfigProvider)
	.config(function($sceDelegateProvider, $touchProvider) {
		'ngInject';
		$touchProvider.ngClickOverrideEnabled(true);
		$sceDelegateProvider.resourceUrlWhitelist([
			// Allow same origin resource loads.
			'self',
			// Allow loading from our assets domain.  Notice the difference between * and **.
			'https://www.google.com/**'
		]);
	});
	

