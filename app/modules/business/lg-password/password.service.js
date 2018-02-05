export function Password($injector, $http, $rootScope, $q, $state, lgConfig) {
	'ngInject';
	const service = this;

	service.retrieveFromCode = function(id, code) {
		
		
		
		$http({
			url: lgConfig.wsDir() + 'user/retrieveFromCode.php',
			method: 'POST',
			data: {
				code: code,
				id: id
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				$state.go('error');
				return;
			}
			service.error = undefined;
			service.current = response.data.user;
			
		}).catch(function(error) {
			service.error = error;
		});
	};


	service.forgottenPasswordData = {
		email: '',
		type: 'forgotten-password'
	};

	service.forgottenPassword = function(data) {
		

		// TODO: include recaptcha data
		$http({
			url: lgConfig.wsDir() + 'user/forgottenPassword.php',
			method: 'POST',
			data: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.current = response.data.user;
			$state.go('password:forgottenPassword:mailsent');
		}).catch(function(error) {
			console.error('error', error);
			service.error = error;
		});
	};
}
