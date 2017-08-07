const app = angular.module('lg-password');
require('./ctrl/lg-password-ctrl.js');

app.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state({
		name: 'password:forgottenPassword',
		url: '/forgotten-password',
		component: 'lgUserForgottenPasswordRoute'
	});
	$stateProvider.state({
		name: 'password:forgottenPassword:mailsent',
		url: '/forgotten-password-mailsent',
		component: 'lgMessage',
		resolve: {
			service: function(password) {
				'ngInject';
				return {
					state: 'home',
					label: 'Accueil',
					message: 'Un lien de réactivation a été envoyé sur le mail ' + password.forgottenPasswordData.email
				};
			}
		}
	});
	$stateProvider.state({
		name: 'password:chooseNewPassword',
		url: '/choose-new-password',
		component: 'lgUserChooseNewPasswordRoute'
	});

}]);

import forgottenPasswordHtml from './tmpl/forgotten-password.html';
import chooseNewPasswordHtml from './tmpl/choose-new-password.html';

app.component('lgUserForgottenPasswordRoute', {
	template: forgottenPasswordHtml,
	controller: 'PasswordCtrl'
});

app.component('lgUserChooseNewPasswordRoute', {
	template: chooseNewPasswordHtml,
	controller: 'UserChooseNewPasswordCtrl'
});

