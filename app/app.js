(function() {
	'use strict';

	//console.log('Coucou');

	$(window).load(function() {
		$('.flexslider').flexslider();
	});

// ANGULAR CODE
	var app = angular.module('mainApp', ['ngRoute']);

// le $routeProvider permet de définir les liens lors du clic
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
	app.run(['$rootScope', '$http', function($rootScope, $http) {
		$rootScope.isConnected = false;
		$rootScope.signinData = {};
		$rootScope.signin = function() {
			console.log('sign in');
			var SHA256 = new Hashes.SHA256; // on crée la variable de cryptage
			$http({
				url: 'ws/signin.php',
				method: 'POST',
				data: {
					login: $rootScope.signinData.login,
					// permet de crypter le password
					password: SHA256.hex($rootScope.signinData.password)
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
			});
		};

		$rootScope.signup = function() {
			console.log('sign up');
			var SHA256 = new Hashes.SHA256; // on crée la variable de cryptage
			$http({
				url: 'ws/signup.php',
				method: 'POST',
				data: {
					login: $rootScope.signinData.login,
					// permet de crypter le password
					password: SHA256.hex($rootScope.signinData.password),
					lastname: $rootScope.signinData.lastname,
					firstname: $rootScope.signinData.firstname,
					email: $rootScope.signinData.email,
					//login: $rootScope.signinData.login,

				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
			});
		};
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
