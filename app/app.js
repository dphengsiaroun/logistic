(function() {
	'use strict';

	console.log('Coucou');

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
			.otherwise({
				redirectTo: '/'
			});
	}]);

	app.run(['$rootScope', '$http', function($rootScope, $http) {
		$rootScope.isConnected = false;
		$rootScope.signinData = {};
		$rootScope.signin = function() {
			console.log('sign in');
			$http({
				url: 'ws/signin.php',
				method: 'POST',
				data: $rootScope.signinData,
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

	app.directive('jlgFooter', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/jlg-footer.html'
		};
	});

	app.directive('jlgBanner', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/jlg-banner.html'
		};
	});



})();
