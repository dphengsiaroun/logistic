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
			adminUser.current = response.data.adminConnection.adminUser;
			console.log('adminUser.current');			
			service.isConnected = true;
			service.goToStateAfterConnect();
		}).catch(function(error) {
			console.log('create connexion error');			
			service.error = error;
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
				if ($state.$current.needsAdminUser) {
					$state.go('admin:login');
				}
				return;
			}
			service.isConnected = true;
			adminUser.current = response.data.adminConnection.adminUser;
		}).catch(function(error) {
			console.log('On arrive pas à se connecter');
			service.error = error;
			service.current = undefined;
			service.isConnected = false;
			console.log('$state', $state);
			if ($state.$current.needsAdminUser) {
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
		service.waitForCheckConnection('needsAdminUser').catch(function() {
			if ($state.$current.needsAdminUser) {

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

	service.setAfterConnectAction = function(obj) {
		localStorage.setItem('afterConnect', angular.toJson(obj));
	};

	service.goToStateAfterConnect = function() {

		const json = localStorage.getItem('afterConnect');
		localStorage.removeItem('afterConnect');
		if (json === null) {
			if ($state.$current.name === 'admin') {
				return;
			}
			$state.go('admin');
			return;
		}
		const obj = angular.fromJson(json);

		if (obj.fn && obj.service) {
			const service = $injector.get(obj.service);
			if (obj.fn in service) {

				service[obj.fn].apply(null, obj.args);
			}
		}

		$state.go(obj.state);
	};

}
