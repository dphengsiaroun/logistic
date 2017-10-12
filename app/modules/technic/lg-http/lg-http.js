module.exports = 'lg-http';

const app = angular.module(module.exports, ['lg-misc']);

app.config(function($httpProvider, $provide) {
	'ngInject';

	$provide.factory('myPhpErrorInterceptor', function myPhpErrorInterceptorFactory($q, lgMisc) {
		'ngInject';

		return {
			response: function(response) {
				const url = response.config.url;

				if (lgMisc.isWebService(url) && typeof response.data === 'string') {
					const str = response.data;
					response.data = {
						status: 'ko',
						errorCode: '-1',
						errorMsg: str,
					};
					console.error('data', response.data);
					return $q.reject(response);
				}

				// if (lgMisc.isWebService(url) && response.data.status === 'ko') {
				// 	console.error('data', response.data);
				// 	return $q.reject(response);
				// }
				return response;
			}
		};
	});

	$httpProvider.interceptors.push('myPhpErrorInterceptor');

	
});
