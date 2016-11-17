(function() {
	'use strict';

	var app = angular.module('mainApp', ['ngRoute', 'lg-menu', 'lg-svg']);

	app.config(['$routeProvider', function($routeProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'tmpl/home.html'
			})
			.when('/signin', {
				templateUrl: 'tmpl/signin.html'
			})
			.when('/signup', {
				templateUrl: 'tmpl/signup.html'
			})
			.when('/offers', {
				templateUrl: 'tmpl/offers.html'
			})
			.when('/depot-annonce', {
				templateUrl: 'tmpl/depot-annonce.html'
			})
			.when('/contact', {
				templateUrl: 'tmpl/contact.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);

// permet de récuperer les valeurs en post sous format json
	app.run(['$injector', function($injector) {
		var $rootScope = $injector.get('$rootScope');
		var $http = $injector.get('$http');
		var $location = $injector.get('$location');

		$rootScope.isBackPresent = true;

		$rootScope.isConnected = false;
		$rootScope.signinData = {
			email: 'email@email.com',
			password: 'test'
		};

		$rootScope.connect = function() {
			$rootScope.isConnected = true;
			$rootScope.account = {
				firstname: 'Merouane',
				lastname: 'Debbah'
			};
		};

		$rootScope.disconnect = function() {
			$rootScope.isConnected = false;
			$rootScope.account = undefined;
		};

		$rootScope.signin = function() {
			console.log('sign in');
			var SHA256 = new Hashes.SHA256; // on crée la variable de cryptage
			$http({
				url: 'ws/signin.php',
				method: 'POST',
				data: {
					email: $rootScope.signinData.email,
					// permet de crypter le password
					password: SHA256.hex($rootScope.signinData.password)
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					$rootScope.isSigninError = true;
					return;
				}
				$rootScope.isSigninError = false;
				$rootScope.account = response.data;
				$rootScope.isConnected = true;
				$location.path('/');
			});
		};

		$rootScope.signupData = {
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

		$rootScope.signup = function() {
			console.log('sign up');
			var SHA256 = new Hashes.SHA256;
			var data = {
				email: $rootScope.signupData.email,
				// permet de crypter le password
				password: SHA256.hex($rootScope.signupData.password),
				content: {
					lastname: $rootScope.signupData.lastname,
					firstname: $rootScope.signupData.firstname,
					address: $rootScope.signupData.address
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
					$rootScope.isSignupError = true;
					return;
				}
				$rootScope.isSignupError = false;
				$rootScope.account = data;
				$rootScope.isConnected = true;
				$location.path('/');
			});
		};

		$rootScope.signout = function() {
			console.log('sign out');
			$http({
				url: 'ws/signout.php',
				method: 'GET'
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					$rootScope.isSignoutError = true;
					return;
				}
				$rootScope.isSignoutError = false;
				$rootScope.account = undefined;
				$rootScope.isConnected = false;
				$location.path('/');
			});
		};

		$rootScope.isConnected = function() {
			console.log('is connected?', arguments);
			$http({
				url: 'ws/isConnected.php',
				method: 'GET'
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === "ko") {
					$rootScope.isConnected = false;
					return;
				}
				$rootScope.isConnected = true;
				$rootScope.account = response.data;
			});
		};

		$rootScope.isConnected();
	}]);

// directives pour la création des balises
	app.directive('jlgHeader', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/jlg-header.html'
		};
	});

	app.directive('jlgBanner', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/jlg-banner.html'
		};
	});

	app.directive('jlgBannerpic', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/jlg-bannerpic.html'
		};
	});

	app.directive('jlgFooter', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/jlg-footer.html'
		};
	});

	

})();
