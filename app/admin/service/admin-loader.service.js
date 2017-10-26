export function AdminLoader($http, $state, $q, $window, adminConnection, adminUser, lgConfig) {
	'ngInject';

	const service = this;

	service.list = function(data) {
		
		return $http({
			url: lgConfig.wsDir() + 'admin/loaders',
			method: 'GET',
			params: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return $q.reject(response);
			}
			service.error = undefined;
			return response.data.loaders;
		}).catch(function(error) {
			service.error = error;
			return $q.reject(error);
		});
	};

	service.get = function(id) {
		
		return this.list().then(function(loaders) {
			service.loaders = loaders;
			service.loaderMap = $window.makeMap(loaders);
			service.current = service.loaderMap[id];
		});
	};

	service.delete = function(id) {
		
		return $http({
			url: lgConfig.wsDir() + 'admin/loaders/' + id,
			method: 'DELETE'
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				return $q.reject(response);
			}
			service.error = undefined;
			service.loaders = undefined;
			service.current = undefined;
			$state.go('admin:loaders');
		});
	};

}

