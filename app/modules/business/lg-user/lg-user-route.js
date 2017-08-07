const app = angular.module('lg-user');

app.config(['$stateProvider', function($stateProvider) {

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
		needsUser: true
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

}]);

function initCtrl(ctrl, $scope, $injector) {
	ctrl.user = $injector.get('user');
	ctrl.connection = $injector.get('connection');
	ctrl.user.error = undefined;
	$scope.$watch('$ctrl.user.signupData.content.login', function() {
		console.log('ctrl.user', ctrl.user);
		console.log('ctrl.user.signupData.content.login', ctrl.user.signupData.content.login);
		ctrl.user.signupData.content.login = angular.lowercase(ctrl.user.signupData.content.login);
	});
	$scope.$watch('$ctrl.user.updateData.content.login', function() {
		console.log('ctrl.user', ctrl.user);
		console.log('ctrl.user.updateData.content.login', ctrl.user.updateData.content.login);
		ctrl.user.updateData.content.login = angular.lowercase(ctrl.user.updateData.content.login);
	});
	$scope.$watch('$ctrl.user.current', function() {
		if (ctrl.user.current) {
			ctrl.user.updateData = angular.copy(ctrl.user.current);
		}
	});
}

app.controller('UserCtrl', function UserCtrl($scope, $injector, formValidator) {
	'ngInject';
	initCtrl(this, $scope, $injector);
	this.fv = formValidator;
});

import signupHtml from './tmpl/signup.html';
import signupSuccessHtml from './tmpl/signup_success.html';
import profileHtml from './tmpl/profile.html';
import updatePasswordHtml from './tmpl/update-password.html';
import initiatePasswordHtml from './tmpl/initiate-password.html';

app.component('lgUserCreateRoute', {
	template: signupHtml,
	controller: 'UserCtrl'
});
app.component('lgUserSignupSuccessRoute', {
	template: signupSuccessHtml,
	controller: 'UserCtrl'
});

app.component('lgUserRetrieveRoute', {
	template: profileHtml,
	controller: 'UserCtrl'
});

app.component('lgUserUpdatePasswordRoute', {
	template: updatePasswordHtml,
	controller: 'UserCtrl'
});

app.component('lgUserInitiatePasswordRoute', {
	template: initiatePasswordHtml,
	controller: 'UserCtrl'
});
