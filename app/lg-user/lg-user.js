(function() {
	'use strict';

	var app = angular.module('lg-user', []);
	
	
	var makeUrl = function(str) {
		return 'ws/user/' + str + '.php';
	};

	app.service('user', ['$injector', function User($injector) {
		var $http = $injector.get('$http');
		var $state = $injector.get('$state');
		var $window = $injector.get('$window');

		var service = this;

		this.signupData = {
			email: 'email@email.com',
			password: 'test',
			content: {
				lastname: 'Debbah',
				firstname: 'Mérouane',
				pseudo: 'Meme',
				address: {
					street: '99 rue de Paris',
					city: 'Torcy',
					zipcode: '77200',
					country: 'France'
				}
			}
		};

		this.signup = function() {
			console.log('sign up');
			var SHA256 = new Hashes.SHA256;
			var data = angular.copy(service.signupData);
			data.password = SHA256.hex(service.signupData.password);
			
			$http({
				url: makeUrl('signup'),
				method: 'POST',
				data: data,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					service.error = response;
					return;
				}
				service.error = undefined;
				service.account = response.data.account;
				$state.go('user:signupSuccess');
			}).catch(function(error) {
				service.error = error;
			});
		};

				this.signinData = {
			email: 'email@email.com',
			password: 'test'
		};

		this.signin = function() {
			console.log('sign in');
			var SHA256 = new Hashes.SHA256; // on crée la variable de cryptage
			$http({
				url: makeUrl('signin'),
				method: 'POST',
				data: {
					email: service.signinData.email,
					// permet de crypter le password
					password: SHA256.hex(service.signinData.password)
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					service.error = response;
					return;
				}
				service.error = undefined;
				service.account = response.data;
				$state.go('home');
			}).catch(function(error) {
				service.error = error;
			});
		};

		this.signout = function() {
			console.log('sign out');
			$http({
				url: makeUrl('signout'),
				method: 'GET'
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					service.error = response;
					return;
				}
				service.isSignoutError = false;
				service.account = undefined;
				$state.go('home');
			}).catch(function(error) {
				service.error = error;
			});
		};

		this.isConnected = function() {
			console.log('is connected?', arguments);
			$http({
				url: makeUrl('isConnected'),
				method: 'GET'
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					service.account = undefined;
					if ($state.$current.needsUser) {
						$state.go('home');
					}
					return;
				}
				service.account = response.data;
			}).catch(function(error) {
				service.error = error;
			});
		};

		this.isConnected();

		this.update = function(data) {
			console.log('user->update');
			
			$http({
				url: makeUrl('update'),
				method: 'POST',
				data: data,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					service.error = response;
					return;
				}
				service.error = undefined;
				service.account = response.data.account;
				$state.go('user:updated');
			}).catch(function(error) {
				service.error = error;
			});
		};

		this.delete = function() {
			console.log('user->delete', service.account);
			
			$http({
				url:  makeUrl('delete'),
				method: 'POST',
				data: {
					id: service.account.id
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					service.error = response;
					return;
				}
				service.error = undefined;
				service.account = undefined;
				$state.go('user:deleted');
			}).catch(function(error) {
				service.error = error;
			});
		};

		this.updatePasswordData = {
			oldPassword: 'test',
			newPassword: 'test'
		};

		this.updatePassword = function(data) {
			console.log('user->updatePassword');
			var SHA256 = new Hashes.SHA256;
			var data = {
				oldPassword: SHA256.hex(this.updatePasswordData.oldPassword),
				newPassword: SHA256.hex(this.updatePasswordData.newPassword)
			};
			
			
			$http({
				url: makeUrl('updatePassword'),
				method: 'POST',
				data: data,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					service.error = response;
					return;
				}
				service.error = undefined;
				service.account = response.data.account;
				$state.go('user:updatedPassword');
			}).catch(function(error) {
				console.error('error', error);
				service.error = error;
			});
		};

	}]);

	app.controller('UserCtrl', ['$scope', '$injector', function UserCtrl($scope, $injector) {
		this.user = $injector.get('user');
		this.user.error = undefined;

	}]);

	app.controller('UserUpdateCtrl', ['$scope', '$injector', function UserUpdateCtrl($scope, $injector) {
		this.user = $injector.get('user');
		this.updateData = angular.copy(this.user.account);
		this.user.error = undefined;
	}]);

	app.controller('UserUpdatePasswordCtrl', ['$scope', '$injector', function UserUpdatePasswordCtrl($scope, $injector) {
		this.user = $injector.get('user');
		this.updatePasswordData = angular.copy(this.user.account);
		this.user.error = undefined;
	}]);

	

})();
