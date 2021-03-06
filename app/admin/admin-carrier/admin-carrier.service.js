export function AdminCarrier($http, $state, $q, $window, adminConnection, adminUser, lgConfig) {
	'ngInject';

	const service = this;

	service.list = function(data) {
		
		return $http({
			url: lgConfig.wsDir() + 'admin/carriers',
			method: 'GET',
			params: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			
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

	service.get = function(id) {
		
		return this.list().then(function(carriers) {
			service.carriers = carriers;
			service.carrierMap = $window.makeMap(carriers);
			service.current = service.carrierMap[id];
		});
	};

	service.delete = function(id) {
		
		return $http({
			url: lgConfig.wsDir() + 'admin/carriers/' + id,
			method: 'DELETE'
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				return $q.reject(response);
			}
			service.error = undefined;
			service.carriers = undefined;
			service.current = undefined;
			$state.go('admin:carriers');
		});
	};

}

