(function() {
	'use strict';

	var app = angular.module('lg-user');

	app.config(['$stateProvider', function($stateProvider) {

		$stateProvider.state({
			name: 'user:signin',
			url: '/signin',
			component: 'lgUserSigninRoute'
		});
		$stateProvider.state({
			name: 'user:signup',
			url: '/signup',
			component: 'lgUserSignupRoute'
		});
		$stateProvider.state({
			name: 'user:signupSuccess',
			url: '/signup',
			component: 'lgUserSignupSuccessRoute'
		});
		$stateProvider.state({
			name: 'user:signout',
			url: '/signout',
			component: 'lgUserSignoutRoute'
		});
		$stateProvider.state({
			name: 'user:retrieve',
			url: '/profile',
			component: 'lgUserRetrieveRoute'
		});
		$stateProvider.state({
			name: 'user:updated',
			url: '/profile',
			component: 'lgUserUpdatedRoute'
		});
		$stateProvider.state({
			name: 'user:confirmDelete',
			url: '/profile',
			component: 'lgUserConfirmDeletedRoute'
		});
		$stateProvider.state({
			name: 'user:deleted',
			url: '/profile',
			component: 'lgUserDeletedRoute'
		});
	
	}]);

	app.component('lgUserSigninRoute', {
		templateUrl: 'lg-user/tmpl/signin.html',
		controller: 'UserCtrl'
	});

	app.component('lgUserSignupRoute', {
		templateUrl: 'lg-user/tmpl/signup.html',
		controller: 'UserCtrl'
	});
	app.component('lgUserSignupSuccessRoute', {
		templateUrl: 'lg-user/tmpl/signup_success.html',
		controller: 'UserCtrl'
	});

	app.component('lgUserSignoutRoute', {
		templateUrl: 'lg-widget/tmpl/lg-prompt.html',
		controller: ['$injector', function User($injector) {
			this.user = $injector.get('user');
			var $rootScope = $injector.get('$rootScope');
			this.doNo = function() {
				$rootScope.back();
			};
			this.doYes = function() {
				this.user.signout();
			};
		}]
	});

	app.component('lgUserRetrieveRoute', {
		templateUrl: 'lg-user/tmpl/profile.html',
		controller: 'UserUpdateCtrl'
	});

	app.component('lgUserUpdatedRoute', {
		templateUrl: 'lg-user/tmpl/update_success.html',
		controller: 'UserCtrl'
	});

	app.component('lgUserConfirmDeletedRoute', {
		templateUrl: 'lg-user/tmpl/confirm_delete.html',
		controller: 'UserCtrl'
	});

	app.component('lgUserDeletedRoute', {
		templateUrl: 'lg-user/tmpl/delete_success.html',
		controller: 'UserCtrl'
	});

	
	
	

})();
