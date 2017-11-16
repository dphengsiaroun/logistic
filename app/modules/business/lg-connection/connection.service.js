import Hashes from 'jshashes';

export function Connection($http, $rootScope, $injector, $q, $state, lgConfig, afterConnect) {
	'ngInject';
	const service = this;
	service.isConnected = undefined;
	service.user = undefined;
	service.createConnectionData = {};
	$rootScope.connection = service;
	service.afterConnect = afterConnect;

	service.create = function(createConnectionData) {
		
		const SHA256 = new Hashes.SHA256; // on crée la variable de cryptage
		$http({
			url: lgConfig.wsDir() + 'connections',
			method: 'POST',
			data: {
				login: createConnectionData.login,
				// permet de crypter le password
				password: SHA256.hex(createConnectionData.password)
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.user = response.data.connection.user;
			console.log('connection.user', service.user);
			service.isConnected = true;
			console.log('service.isConnected', service.isConnected);
			afterConnect.execute();
		}).catch(function(error) {
			service.error = error;
		});
	};

	service.check = function() {
		
		if (service.isConnected !== undefined) {
			return;
		}
		$http({
			url: lgConfig.wsDir() + 'connections/12',
			method: 'GET'
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.current = undefined;
				service.isConnected = false;
				if ($state.$current.needsUser) {
					$state.go('home');
				}
				return;
			}
			service.isConnected = true;
			service.user = response.data.connection.user;
			console.log('$state', $state);
		}).catch(function(error) {
			service.error = error;
		});
	};

	service.waitForCheckConnection = function(reason) {
		return $q(function(resolve, reject) {
			if (service.isConnected === true) {
				resolve();
				return;
			}
			if (service.isConnected === false) {
				reject('No user connected');
				return;
			}
			const deregister = $rootScope.$watch('connection.isConnected', function() {
				if (service.isConnected === true) {
					deregister();
					resolve();
				} else if (service.isConnected === false) {
					deregister();
					reject('No user connected');
				}
			});
		});
	};

	function refreshState() {
		service.waitForCheckConnection('needsUser').catch(function() {
			if ($state.$current.needsUser) {
				$state.go('connection:create');
			}
		});
	}

	$rootScope.$on('$viewContentLoaded', refreshState);

	service.delete = function() {
		
		$http({
			url: lgConfig.wsDir() + 'connections/12',
			method: 'DELETE'
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.user = undefined;
			service.isConnected = false;
			$state.go('home');
		}).catch(function(error) {
			service.error = error;
		});
	};
}
