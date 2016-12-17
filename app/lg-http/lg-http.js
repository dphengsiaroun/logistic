(function() {
	'use strict';

	var app = angular.module('lg-http', ['lg-misc']);

	app.config(function($httpProvider, $provide) {
		'ngInject';

		$provide.factory('myPhpErrorInterceptor', function($injector) {
			'ngInject';
			var $q = $injector.get('$q');
			var lgMisc = $injector.get('lgMisc');

			return {
				response: function(response) {
					var url = response.config.url;

					if (lgMisc.isWebService(url) && typeof response.data === 'string') {
						console.error('error', response);
						return $q.reject(response);
					}
					return response;
				}
			};
		});

		$httpProvider.interceptors.push('myPhpErrorInterceptor');

		console.log('interceptors', $httpProvider.interceptors);
	});
	
})();
