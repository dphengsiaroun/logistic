module.exports = 'lg-http';

const app = angular.module(module.exports, ['lg-misc']);

app.config(function($httpProvider, $provide) {
	'ngInject';

	$provide.factory('myPhpErrorInterceptor', function($q, lgMisc) {
		'ngInject';

		return {
			response: function(response) {
				var url = response.config.url;

				if (lgMisc.isWebService(url) && typeof response.data === 'string') {
					var str = response.data;
					response.data = {
						status: 'ko',
						errorCode: '-1',
						errorMsg: str,
					};
					console.error('data', response.data);
					return $q.reject(response);
				}
				return response;
			}
		};
	});

	$httpProvider.interceptors.push('myPhpErrorInterceptor');

	console.log('interceptors', $httpProvider.interceptors);
});
