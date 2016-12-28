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
			component: 'lgMessage',
			resolve: {
				service: function() {
					return {
						state: 'home',
						label: 'Accueil',
						message: 'Votre compte a bien été mis à jour.'
					}
				}
			},
			needsUser: true
		});
		$stateProvider.state({
			name: 'user:confirmDelete',
			url: '/user-delete',
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
			url: '/user-delete',
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
		$stateProvider.state({
			name: 'user:updatePassword',
			url: '/update-password',
			component: 'lgUserUpdatePasswordRoute',
			back: false,
			needsUser: true
		});
		$stateProvider.state({
			name: 'user:initiatePassword',
			url: '/initiate-password',
			component: 'lgUserInitiatePasswordRoute',
			back: false,
			needsUser: true
		});
		$stateProvider.state({
			name: 'user:updatedPassword',
			url: '/update-password',
			component: 'lgMessage',
			resolve: {
				service: function() {
					return {
						state: 'home',
						label: 'Accueil',
						message: 'Votre mot de passe a bien été mis à jour.'
					}
				}
			},
			needsUser: true
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

	app.component('lgUserUpdatePasswordRoute', {
		templateUrl: 'lg-user/tmpl/update-password.html',
		controller: 'UserUpdateCtrl'
	});

	app.component('lgUserInitiatePasswordRoute', {
		templateUrl: 'lg-user/tmpl/initiate-password.html',
		controller: 'UserUpdateCtrl'
	});

})();
