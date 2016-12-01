(function() {
	'use strict';

	var app = angular.module('lg-user', []);

	app.controller('UserCtrl', ['$scope', '$injector', function($scope, $injector) {
		var $http = $injector.get('$http');
		var $location = $injector.get('$location');
		var $window = $injector.get('$window');

		var ctrl = this;

		this.signinData = {
			email: 'email@email.com',
			password: 'test'
		};

		this.signin = function() {
			console.log('sign in');
			var SHA256 = new Hashes.SHA256; // on crée la variable de cryptage
			$http({
				url: 'ws/signin.php',
				method: 'POST',
				data: {
					email: ctrl.signinData.email,
					// permet de crypter le password
					password: SHA256.hex(ctrl.signinData.password)
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					ctrl.isSigninError = true;
					return;
				}
				ctrl.isSigninError = false;
				ctrl.account = response.data;
				$location.path('/');
			});
		};

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
			var data = angular.copy(ctrl.signupData);
			data.password = SHA256.hex(ctrl.signupData.password);
			
			$http({
				url: 'ws/signup.php',
				method: 'POST',
				data: data,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					ctrl.isSignupError = true;
					return;
				}
				ctrl.isSignupError = false;
				ctrl.account = response.data.account;
				$location.path('/signup_success');
			});
		};

		this.signout = function() {
			console.log('sign out');
			$http({
				url: 'ws/signout.php',
				method: 'GET'
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					ctrl.isSignoutError = true;
					return;
				}
				ctrl.isSignoutError = false;
				ctrl.account = undefined;
				$location.path('/');
			});
		};

		this.isConnected = function() {
			console.log('is connected?', arguments);
			$http({
				url: 'ws/isConnected.php',
				method: 'GET'
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					ctrl.account = undefined;
					return;
				}
				ctrl.account = response.data;
			});
		};

		this.isConnected();
	}]);
	

})();
