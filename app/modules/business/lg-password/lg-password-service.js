export function Password($injector, $http, $rootScope, $q, $state) {
	'ngInject';
	const service = this;

	service.retrieveFromCode = function(id, code) {
		console.log('sign in with code');
		console.log('code', code);
		console.log('id', id);
		$http({
			url: 'ws/user/retrieveFromCode.php',
			method: 'POST',
			data: {
				code: code,
				id: id
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				$state.go('error');
				return;
			}
			service.error = undefined;
			service.current = response.data.user;
			console.log('service.current', service.current);
		}).catch(function(error) {
			service.error = error;
		});
	};


	service.forgottenPasswordData = {
		email: 'dphengsiaroun@outlook.fr',
		type: 'forgotten-password'
	};

	service.forgottenPassword = function(data) {
		console.log('user->forgottenPasswordData');

		// TODO: include recaptcha data
		$http({
			url: 'ws/user/sendmail.php',
			method: 'POST',
			data: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
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
