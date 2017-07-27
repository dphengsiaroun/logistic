const app = angular.module('lg-user');

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

const forgottenPasswordUrl = require('./tmpl/forgotten-password.html');
const chooseNewPasswordUrl = require('./tmpl/choose-new-password.html');

app.component('lgUserForgottenPasswordRoute', {
	template: forgottenPasswordUrl,
	controller: 'PasswordCtrl'
});

app.component('lgUserChooseNewPasswordRoute', {
	template: chooseNewPasswordUrl,
	controller: 'UserChooseNewPasswordCtrl'
});

app.controller('PasswordCtrl', function PasswordCtrl(password, user) {
	'ngInject';
	this.password = password;
	this.user = user;
});

app.controller('UserChooseNewPasswordCtrl', function UserChooseNewPasswordCtrl($location, password, user) {
	this.password = password;
	this.user = user;
	const code = $location.search().code;
	const id = $location.search().id;
	password.retrieveFromCode(id, code);
	password.forgottenPasswordData.id = id;
	password.forgottenPasswordData.code = code;
});

