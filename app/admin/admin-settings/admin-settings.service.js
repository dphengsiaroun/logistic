export function AdminSettings($http, $state, $q, $window, lgConfig) {
	'ngInject';

	const service = this;

	service.list = function(data) {
		
		return $http({
			url: lgConfig.wsDir() + 'admin/logs',
			method: 'GET',
			params: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return $q.reject(response);
			}
			service.error = undefined;
			return response.data.logs;
		}).catch(function(error) {
			service.error = error;
			return $q.reject(error);
		});
	};
}

