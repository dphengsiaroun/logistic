(function() {
	'use strict';

	var app = angular.module('mainApp', [
		'ngRoute', 
		'ngSanitize',
		'lg-upload',
		'lg-menu',
		'lg-svg',
		'lg-user',
		'lg-choice',
		'lg-eyepassword',
		'lg-config',
		'lg-widget',
		'lg-debug',
		]);

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
			.when('/signup_success', {
				templateUrl: 'tmpl/signup_success.html'
			})
			.when('/signout', {
				templateUrl: 'tmpl/signout.html'
			})
			.when('/profile', {
				templateUrl: 'tmpl/profile.html'
			})
			.when('/loader-create-ad-step1', {
				templateUrl: 'tmpl/loader-create-ad-step1.html'
			})
			.when('/loader-create-ad-step2', {
				templateUrl: 'tmpl/loader-create-ad-step2.html'
			})
			.when('/loader-list-ad', {
				templateUrl: 'tmpl/loader-list-ad.html'
			})
			.when('/loader-detail-ad', {
				templateUrl: 'tmpl/loader-detail-ad.html'
			})
			.when('/loader-create-proposal', {
				templateUrl: 'tmpl/loader-create-proposal.html'
			})
			.when('/loader-proposal-sent', {
				templateUrl: 'tmpl/loader-proposal-sent.html'
			})
			.when('/carrier-create-ad-step1', {
				templateUrl: 'tmpl/carrier-create-ad-step1.html'
			})
			.when('/carrier-create-ad-step2', {
				templateUrl: 'tmpl/carrier-create-ad-step2.html'
			})
			.when('/carrier-list-ad', {
				templateUrl: 'tmpl/carrier-list-ad.html'
			})
			.when('/carrier-detail-ad', {
				templateUrl: 'tmpl/carrier-detail-ad.html'
			})
			.when('/carrier-create-proposal', {
				templateUrl: 'tmpl/carrier-create-proposal.html'
			})
			.when('/carrier-proposal-sent', {
				templateUrl: 'tmpl/carrier-proposal-sent.html'
			})
			.when('/calendar', {
				templateUrl: 'tmpl/calendar.html'
			})
			.when('/test', {
				templateUrl: 'tmpl/test.html'
			})
			.when('/test2', {
				templateUrl: 'tmpl/test2.html'
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
