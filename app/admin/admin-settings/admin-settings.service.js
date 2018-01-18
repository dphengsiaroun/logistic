export function AdminSettings($http, $state, $q, $window, lgConfig) {
	'ngInject';

	const service = this;

	this.logFile = new LogFile($http, $q, lgConfig, service);
	this.logLevel = new LogLevel($http, $q, lgConfig, service);
	
}

function LogFile($http, $q, lgConfig, service) {

	this.list = function(data) {
		
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

function LogLevel($http, $q, lgConfig, service) {

	this.update = function(data) {
		
		return $http({
			url: lgConfig.wsDir() + 'admin/logLevels',
			method: 'PUT',
			data: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return $q.reject(response);
			}
			service.error = undefined;
		}).catch(function(error) {
			service.error = error;
			return $q.reject(error);
		});
	};
}

