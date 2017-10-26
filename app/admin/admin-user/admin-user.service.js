export function AdminUser($http, $state, $q, $window, lgConfig) {
	'ngInject';

	const service = this;

	service.list = function(data) {
		
		return $http({
			url: lgConfig.wsDir() + 'admin/users',
			method: 'GET',
			params: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return $q.reject(response);
			}
			service.error = undefined;
			return response.data.users;
		}).catch(function(error) {
			service.error = error;
			return $q.reject(error);
		});
	};

	service.get = function(id) {
		
		return this.list().then(function(users) {
			service.users = users;
			service.userMap = $window.makeMap(users);
			service.current = service.userMap[id];
		});
	};

	service.delete = function(id) {
		
		return $http({
			url: lgConfig.wsDir() + 'admin/users/' + id,
			method: 'DELETE'
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				return $q.reject(response);
			}
			service.error = undefined;
			service.users = undefined;
			service.current = undefined;
			$state.go('admin:users');
		});
	};

}

