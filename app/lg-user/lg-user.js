(function() {
	'use strict';

	var app = angular.module('lg-user', []);

	app.controller('userCtrl', ['$scope', '$injector', function($scope, $injector) {
		var $http = $injector.get('$http');
		var $location = $injector.get('$location');
		var $window = $injector.get('$window');

		$scope.signinData = {
			email: 'email@email.com',
			password: 'test'
		};

		$scope.signin = function() {
			console.log('sign in');
			var SHA256 = new Hashes.SHA256; // on crée la variable de cryptage
			$http({
				url: 'ws/signin.php',
				method: 'POST',
				data: {
					email: $scope.signinData.email,
					// permet de crypter le password
					password: SHA256.hex($scope.signinData.password)
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					$scope.isSigninError = true;
					return;
				}
				$scope.isSigninError = false;
				$scope.account = response.data;
				$location.path('/');
			});
		};

		$scope.signupData = {
			email: 'email@email.com',
			password: 'test',
			lastname: 'mon nom',
			firstname: 'mon prenom',
			address: {
				street: '99 rue de Paris',
				city: 'Torcy',
				zipcode: '77200',
				country: 'France'
			}

		};

		$scope.signup = function() {
			console.log('sign up');
			var SHA256 = new Hashes.SHA256;
			var data = {
				email: $scope.signupData.email,
				// permet de crypter le password
				password: SHA256.hex($scope.signupData.password),
				content: {
					lastname: $scope.signupData.lastname,
					firstname: $scope.signupData.firstname,
					address: $scope.signupData.address
				}
			};
			$http({
				url: 'ws/signup.php',
				method: 'POST',
				data: data,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					$scope.isSignupError = true;
					return;
				}
				$scope.isSignupError = false;
				$scope.account = data;
				$scope.isConnected = true;
				$location.path('/');
			});
		};

		$scope.signout = function() {
			console.log('sign out');
			$http({
				url: 'ws/signout.php',
				method: 'GET'
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					$scope.isSignoutError = true;
					return;
				}
				$scope.isSignoutError = false;
				$scope.account = undefined;
				$location.path('/');
			});
		};

		$scope.isConnected = function() {
			console.log('is connected?', arguments);
			$http({
				url: 'ws/isConnected.php',
				method: 'GET'
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					$scope.account = undefined;
					return;
				}
				$scope.account = response.data;
			});
		};

		$scope.isConnected();
	}]);
	

})();
