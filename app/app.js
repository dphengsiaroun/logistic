(function() {
	'use strict';

	//console.log('Coucou');

	$(window).load(function() {
		$('.flexslider').flexslider();
	});

	var app = angular.module('mainApp', ['ngRoute']);

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

	app.run(['$rootScope', '$http', function($rootScope, $http) {
		$rootScope.isConnected = false;
		$rootScope.signinData = {};
		$rootScope.signin = function() {
			console.log('sign in');
			var SHA256 = new Hashes.SHA256;
			$http({
				url: 'ws/signin.php',
				method: 'POST',
				data: {
					login: $rootScope.signinData.login,
					password: SHA256.hex($rootScope.signinData.password)
				},
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
			});
		};
	}]);

	app.directive('jlgHeader', function() {
		console.log('Hello');
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
