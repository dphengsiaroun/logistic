import Hashes from 'jshashes';

export function User($injector, $http, $rootScope, $q, $state, userValidator, lgConfig) {
	'ngInject';
	const service = this;

	this.userValidator = userValidator;

	this.signupData = {
		content: {}
	};

	this.create = function() {
		console.log('sign up');
		const SHA256 = new Hashes.SHA256;
		const data = angular.copy(service.signupData);
		data.password = SHA256.hex(service.signupData.password);

		$http({
			url: lgConfig.wsDir() + 'users',
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
			const connection = $injector.get('connection');
			connection.isConnected = true;
			$state.go('user:create:success');
		}).catch(function(error) {
			service.error = error;
		});
	};

	this.updateData = {
		content: {}
	};
	console.log('this.updateData', this.updateData);

	this.update = function() {
		console.log('user->update');

		$http({
			url: lgConfig.wsDir() + 'users/' + service.updateData.id,
			method: 'PUT',
			data: service.updateData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
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

	this.delete = function() {
		console.log('user->delete', service.current);

		return $http({
			url: lgConfig.wsDir() + 'users/' + service.current.id,
			method: 'DELETE',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				return $q.reject(response);
			}
			service.current = undefined;
			const connection = $injector.get('connection');
			connection.isConnected = false;
			$state.go('user:deleted');
		});
	};

	this.updatePasswordData = {
		oldPassword: 'test',
		newPassword: 'test'
	};

	this.updatePassword = function(data) {
		console.log('user->updatePassword', arguments);
		const SHA256 = new Hashes.SHA256;
		const hashedData = angular.copy(data);
		if (hashedData.oldPassword) {
			hashedData.oldPassword = SHA256.hex(hashedData.oldPassword);
		}
		if (hashedData.newPassword) {
			hashedData.newPassword = SHA256.hex(hashedData.newPassword);
		}
		$http({
			url: lgConfig.wsDir() + 'users/' + data.id,
			method: 'PATCH',
			data: hashedData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
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
