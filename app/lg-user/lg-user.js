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
					service.isSignupError = true;
					return;
				}
				service.isSignupError = false;
				service.account = response.data.account;
				$state.go('user:signupSuccess');
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
					service.isSigninError = true;
					return;
				}
				service.isSigninError = false;
				service.account = response.data;
				$state.go('home');
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
					service.isSignoutError = true;
					return;
				}
				service.isSignoutError = false;
				service.account = undefined;
				$state.go('home');
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
					service.isUpdateError = true;
					return;
				}
				service.isUpdateError = false;
				service.account = response.data.account;
				$state.go('user:updated');
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
					service.isDeleteError = true;
					return;
				}
				service.isDeleteError = false;
				service.account = undefined;
				$state.go('user:deleted');
			});
		};
	}]);

	app.controller('UserCtrl', ['$scope', '$injector', function($scope, $injector) {
		this.user = $injector.get('user');

	}]);

	app.controller('UserUpdateCtrl', ['$scope', '$injector', function($scope, $injector) {
		this.user = $injector.get('user');
		this.updateData = angular.copy(this.user.account);

	}]);
	

})();
