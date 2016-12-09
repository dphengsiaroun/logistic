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
			component: 'lgUserSignupSuccessRoute',
			back: false
		});
		$stateProvider.state({
			name: 'user:signout',
			url: '/signout',
			component: 'lgPrompt',
			resolve: {
				service: ['$injector', function($injector) {
					var $rootScope = $injector.get('$rootScope');
					var user = $injector.get('user');
					return {
						questionMsg: 'Voulez vous vraiment vous déconnecter&nbsp;?',
						doNo: $rootScope.back,
						doYes: user.signout
					};
				}]
			},
			needsUser: true
		});
		$stateProvider.state({
			name: 'user:retrieve',
			url: '/profile',
			component: 'lgUserRetrieveRoute',
			needsUser: true
		});
		$stateProvider.state({
			name: 'user:updated',
			url: '/profile',
			component: 'lgUserUpdatedRoute',
			needsUser: true
		});
		$stateProvider.state({
			name: 'user:confirmDelete',
			url: '/user_delete',
			component: 'lgConfirm',
			resolve: {
				service: ['$injector', function($injector) {
					var user = $injector.get('user');
					var $state = $injector.get('$state');
					var result = {};
					result.doCancel = function() {
						$state.go('user:retrieve');
					};
					result.doConfirm = function() {
						user.delete();
					};
					result.confirmationMsg = 'Voulez-vous vraiment supprimer votre compte&nbsp;?';
					result.cancelMsg = 'Non, annuler';
					result.confirmMsg = 'Oui, supprimer';
					return result;
				}]
			},
			needsUser: true
		});
		$stateProvider.state({
			name: 'user:deleted',
			url: '/user_delete',
			component: 'lgMessage',
			resolve: {
				service: function() {
					return {
						state: 'home',
						label: 'Accueil',
						message: 'Votre compte a bien été supprimé.'
					}
				}
			},
			back: false
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

	app.component('lgUserRetrieveRoute', {
		templateUrl: 'lg-user/tmpl/profile.html',
		controller: 'UserUpdateCtrl'
	});

	app.component('lgUserUpdatedRoute', {
		templateUrl: 'lg-user/tmpl/update_success.html',
		controller: 'UserCtrl'
	});

})();
