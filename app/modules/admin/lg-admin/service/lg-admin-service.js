export function Admin($injector, $http, $rootScope, $q, $state) {
	'ngInject';
	const service = this;

	service.list = function(data) {
		console.log('truck->list');
		return $http({
			url: 'ws/trucks',
			method: 'GET',
			params: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return $q.reject(response);
			}
			service.error = undefined;
			return response.data.carriers;
		}).catch(function(error) {
			service.error = error;
			return $q.reject(error);
		});
	};
}
