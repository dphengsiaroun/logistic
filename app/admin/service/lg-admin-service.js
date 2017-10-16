import Hashes from 'jshashes';

export function Admin($http, $rootScope, $injector, $q, $state, user, lgConfig) {
	'ngInject';
	const service = this;
	service.isConnected = undefined;
	service.createConnectionData = {};
	$rootScope.connection = service;

	service.create = function() {
		
		const SHA256 = new Hashes.SHA256; // on crée la variable de cryptage
		$http({
			url: lgConfig.wsDir() + 'connections',
			method: 'POST',
			data: {
				login: service.createConnectionData.login,
				// permet de crypter le password
				password: SHA256.hex(service.createConnectionData.password)
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
			user.current = response.data.connection.user;
			service.isConnected = true;
			service.goToStateAfterConnect();
		}).catch(function(error) {
			service.error = error;
		});
    };
}
