(function() {
	'use strict';

	var app = angular.module('lg-http', []);

	app.config(function($httpProvider, $provide) {
		'ngInject';

		$provide.factory('myPhpErrorInterceptor', function($injector) {
			'ngInject';
			var $q = $injector.get('$q');

			return {
				response: function(response) {

					if (response.config.url.match(/ws\/.*\.php/) && typeof response.data === 'string') {
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
