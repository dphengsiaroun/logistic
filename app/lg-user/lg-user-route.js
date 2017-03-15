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
		url: '/signup-success',
		component: 'lgUserSignupSuccessRoute'
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
		url: '/updated-profile',
		component: 'lgMessage',
		resolve: {
			service: function() {
				return {
					state: 'home',
					label: 'Accueil',
					message: 'Votre compte a bien été mis à jour.'
				};
			}
		},
		needsUser: true
	});
	$stateProvider.state({
		name: 'user:confirmDelete',
		url: '/user-delete',
		component: 'lgConfirm',
		resolve: {
			service: function($state, user) {
				'ngInject';
				var result = {};
				result.doCancel = function() {
					$state.go('user:retrieve');
				};
				result.doConfirm = function() {
					user.delete().catch(function(error) {
						result.error = error;
					});
				};
				result.confirmationMsg = 'Voulez-vous vraiment supprimer votre compte&nbsp;?';
				result.cancelMsg = 'Non, annuler';
				result.confirmMsg = 'Oui, supprimer';
				return result;
			}
		},
		needsUser: true
	});
	$stateProvider.state({
		name: 'user:deleted',
		url: '/user-deleted',
		component: 'lgMessage',
		resolve: {
			service: function() {
				return {
					state: 'home',
					label: 'Accueil',
					message: 'Votre compte a bien été supprimé.'
				};
			}
		}
	});
	$stateProvider.state({
		name: 'user:updatePassword',
		url: '/update-password',
		component: 'lgUserUpdatePasswordRoute',
		needsUser: true
	});
	$stateProvider.state({
		name: 'user:initiatePassword',
		url: '/initiate-password',
		component: 'lgUserInitiatePasswordRoute',
		needsUser: true
	});
	$stateProvider.state({
		name: 'user:updatedPassword',
		url: '/updated-password',
		component: 'lgMessage',
		resolve: {
			service: function() {
				return {
					state: 'home',
					label: 'Accueil',
					message: 'Votre mot de passe a bien été mis à jour.'
				};
			}
		},
		needsUser: true
	});
	$stateProvider.state({
		name: 'user:forgottenPassword',
		url: '/forgotten-password',
		component: 'lgUserForgottenPasswordRoute'
	});
	$stateProvider.state({
		name: 'user:forgottenPassword:mailsent',
		url: '/forgotten-password-mailsent',
		component: 'lgMessage',
		resolve: {
			service: function(user) {
				return {
					state: 'home',
					label: 'Accueil',
					message: 'Un lien de réactivation a été envoyé sur le mail ' + user.forgottenPasswordData.email
				};
			}
		}
	});
	$stateProvider.state({
		name: 'user:chooseNewPassword',
		url: '/choose-new-password',
		component: 'lgUserChooseNewPasswordRoute'
	});

	$stateProvider.state({
		name: 'user:hasAccount',
		url: '/do-you-have-an-account',
		component: 'lgPrompt',
		resolve: {
			service: function($state, user) {
				'ngInject';
				return {
					questionMsg: 'Avez-vous déjà un compte chez nous&nbsp;?',
					doNo: function() {
						$state.go('user:signup');
					},
					doYes: function() {
						$state.go('user:signin');
					}
				};
			}
		},
	});

	$stateProvider.state({
		name: 'user:myAds',
		url: '/my-ads',
		component: 'lgUserMyAdsRoute'
	});

}]);

var myAdsUrl = require('./tmpl/my-ads.html');
var signinUrl = require('./tmpl/signin.html');
var signupUrl = require('./tmpl/signup.html');
var signupSuccessUrl = require('./tmpl/signup_success.html');
var profileUrl = require('./tmpl/profile.html');
var updatePasswordUrl = require('./tmpl/update-password.html');
var initiatePasswordUrl = require('./tmpl/initiate-password.html');
var forgottenPasswordUrl = require('./tmpl/forgotten-password.html');
var chooseNewPasswordUrl = require('./tmpl/choose-new-password.html');


app.component('lgUserSigninRoute', {
	templateUrl: signinUrl,
	controller: 'UserCtrl'
});

app.component('lgUserSignupRoute', {
	templateUrl: signupUrl,
	controller: 'UserCtrl'
});
app.component('lgUserSignupSuccessRoute', {
	templateUrl: signupSuccessUrl,
	controller: 'UserCtrl'
});

app.component('lgUserRetrieveRoute', {
	templateUrl: profileUrl,
	controller: 'UserUpdateCtrl'
});

app.component('lgUserUpdatePasswordRoute', {
	templateUrl: updatePasswordUrl,
	controller: 'UserUpdateCtrl'
});

app.component('lgUserInitiatePasswordRoute', {
	templateUrl: initiatePasswordUrl,
	controller: 'UserUpdateCtrl'
});

app.component('lgUserForgottenPasswordRoute', {
	templateUrl: forgottenPasswordUrl,
	controller: 'UserCtrl'
});

app.component('lgUserChooseNewPasswordRoute', {
	templateUrl: chooseNewPasswordUrl,
	controller: 'UserChooseNewPasswordCtrl'
});

app.component('lgUserMyAdsRoute', {
	templateUrl: myAdsUrl,
	controller: 'UserMyAdsCtrl'
});




