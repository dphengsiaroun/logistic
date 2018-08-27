import Hashes from 'jshashes';

export function User($injector, $http, $rootScope, $q, $state, connection, userValidator, lgConfig) {
	'ngInject';
	const service = this;

	this.userValidator = userValidator;

	this.signupData = {
		content: {}
	};

	this.create = function() {
		const SHA256 = new Hashes.SHA256;
		const data = angular.copy(service.signupData);
		data.password = SHA256.hex(service.signupData.password);

		$http({
			url: lgConfig.wsDir() + 'users',
			method: 'POST',
			data: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			connection.user = response.data.user;
			connection.isConnected = true;
			$state.go('user:create:success');
		}).catch(function(error) {
			service.error = error;
		});
	};

	this.updateData = {
		content: {}
	};
	

	this.update = function() {
		$http({
			url: lgConfig.wsDir() + 'users/' + service.updateData.id,
			method: 'PUT',
			data: service.updateData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.current = response.data.user;
			$state.go('user:updated');
		}).catch(function(error) {
			service.error = error;
		});
	};

	this.patch = function() {
		$http({
			url: lgConfig.wsDir() + 'users/' + connection.user.id,
			method: 'PUT',
			data: connection.user,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('coucou');
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.current = response.data.user;
		}).catch(function(error) {
			service.error = error;
		});
	};

	this.delete = function() {
		return $http({
			url: lgConfig.wsDir() + 'users/' + connection.user.id,
			method: 'DELETE',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				return $q.reject(response);
			}
			service.current = undefined;
			connection.user = undefined;
			connection.isConnected = false;
			$state.go('user:deleted');
		});
	};

	this.updatePasswordData = {
		oldPassword: '',
		newPassword: ''
	};

	this.updatePassword = function(data) {
		const SHA256 = new Hashes.SHA256;
		const hashedData = angular.copy(data);
		if (hashedData.oldPassword) {
			hashedData.oldPassword = SHA256.hex(hashedData.oldPassword);
			console.log('hashedData.oldPassword', hashedData.oldPassword);
		}
		if (hashedData.newPassword) {
			hashedData.newPassword = SHA256.hex(hashedData.newPassword);
			console.log('hashedData.newPassword', hashedData.newPassword);			
		}
		$http({
			url: lgConfig.wsDir() + 'users/' + data.id,
			method: 'PATCH',
			data: hashedData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.current = response.data.user;
			$state.go('user:updatedPassword');
		}).catch(function(error) {
			console.error('error', error);
			service.error = error;
		});
	};

	this.initiatePasswordData = {
		newPassword: '',
	};

	this.initiatePassword = (data) => {
		const SHA256 = new Hashes.SHA256;
		const hashedData = angular.copy(data);
		console.log('hashedData', hashedData);		
		if (hashedData.newPassword) {
			hashedData.newPassword = SHA256.hex(hashedData.newPassword);
			console.log('hashedData.newPassword', hashedData.newPassword);
		}
		$http({
			url: lgConfig.wsDir() + 'users/' + data.id,
			method: 'PATCH',
			data: hashedData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.current = response.data.user;
			$state.go('user:updatedPassword');
		}).catch(function(error) {
			console.error('error', error);
			service.error = error;
		});
	};
}
