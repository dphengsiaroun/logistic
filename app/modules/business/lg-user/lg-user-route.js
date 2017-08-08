import * as lib from './ctrl/lg-user-ctrl.js';


export function config($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'user:create',
		url: '/signup',
		component: 'lgUserCreateRoute'
	});
	$stateProvider.state({
		name: 'user:create:success',
		url: '/signup-success',
		component: 'lgUserSignupSuccessRoute'
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
				const result = {};
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
						$state.go('user:create');
					},
					doYes: function() {
						$state.go('connection:create');
					}
				};
			}
		},
	});

}

import signupHtml from './tmpl/signup.html';
import signupSuccessHtml from './tmpl/signup_success.html';
import profileHtml from './tmpl/profile.html';
import updatePasswordHtml from './tmpl/update-password.html';
import initiatePasswordHtml from './tmpl/initiate-password.html';


export const lgUserCreateRoute =  {
	template: signupHtml,
	controller: lib.UserCtrl
};

export const lgUserSignupSuccessRoute = {
	template: signupSuccessHtml,
	controller: lib.UserCtrl
};

export const lgUserRetrieveRoute = {
	template: profileHtml,
	controller: lib.UserCtrl
};

export const lgUserUpdatePasswordRoute = {
	template: updatePasswordHtml,
	controller: lib.UserCtrl
};

export const lgUserInitiatePasswordRoute = {
	template: initiatePasswordHtml,
	controller: lib.UserCtrl
};

export const UserCtrl = lib.UserCtrl;
