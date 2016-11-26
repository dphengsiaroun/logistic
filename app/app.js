(function() {
	'use strict';

	var app = angular.module('mainApp', ['ngRoute', 'ngSanitize', 'lg-menu', 'lg-svg', 'lg-user', 'lg-choice']);

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
			.when('/signout', {
				templateUrl: 'tmpl/signout.html'
			})
			.when('/offers', {
				templateUrl: 'tmpl/offers.html'
			})
			.when('/loader-create-add-step1', {
				templateUrl: 'tmpl/loader-create-add-step1.html'
			})
			.when('/carrier-create-add-step1', {
				templateUrl: 'tmpl/carrier-create-add-step1.html'
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
		var $window = $injector.get('$window');


		$rootScope.goto = function() {
			console.log('goto', arguments);
			
		};

		$rootScope.back = function() {
			console.log('back', arguments);
			$window.history.back();
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
