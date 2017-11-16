export function AdminConnection($http, $rootScope, $injector, $q, $state, adminUser, lgConfig) {
	'ngInject';
	const service = this;
	service.isConnected = undefined;
	service.createConnectionData = {};
	$rootScope.adminConnection = service;

	service.create = function() {
		$http({
			url: lgConfig.wsDir() + 'admin/connections',
			method: 'POST',
			data: {
				login: service.createConnectionData.adminLogin,
				password: service.createConnectionData.adminPassword
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			adminUser.current = response.data.connection.user;
			console.log('adminUser.current', service);			
			service.isConnected = true;
			console.log('service.isConnected', service.isConnected);	
			$state.go('admin');
		}).catch(function(error) {			
			service.error = error;
			console.log('Erreur lors de la connection');
		});
	};

	service.check = function() {

		if (service.isConnected !== undefined) {
			return;
		}
		$http({
			url: lgConfig.wsDir() + 'admin/connections/12',
			method: 'GET'
		}).then(function(response) {

			if (response.data.status === 'ko') {
				service.current = undefined;
				service.isConnected = false;
				if ($state.$current.needsUser) {
					$state.go('admin:login');
				}
				return;
			}
			service.isConnected = true;
			adminUser.current = response.data.connection.user;
		}).catch(function(error) {
			console.log('On arrive pas à se connecter');
			service.error = error;
			service.current = undefined;
			service.isConnected = false;
			console.log('$state', $state);
			if ($state.$current.needsUser) {
				console.log('Redirection vers login');
				$state.go('admin:login');
			}
		});
	};

	service.waitForCheckConnection = function(reason) {
		return $q(function(resolve, reject) {

			if (service.isConnected === true) {
				resolve();
				return;
			}
			if (service.isConnected === false) {
				reject('No adminUser connected');
				return;
			}
			const deregister = $rootScope.$watch('adminConnection.isConnected', function() {
				if (service.isConnected === true) {

					deregister();
					resolve();
				} else if (service.isConnected === false) {

					deregister();
					reject('No adminUser connected');
				}
			});
		});
	};

	function refreshState() {
		service.waitForCheckConnection('needsUser').catch(function() {
			if ($state.$current.needsUser) {
				console.log('$state', $state);
				$state.go('admin:login');
			}
		});
	}

	$rootScope.$on('$viewContentLoaded', refreshState);

	service.delete = function() {

		$http({
			url: lgConfig.wsDir() + 'admin/connections/12',
			method: 'DELETE'
		}).then(function(response) {

			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			adminUser.current = undefined;
			service.isConnected = false;
			$state.go('admin:login');
		}).catch(function(error) {
			service.error = error;
		});
	};

}
