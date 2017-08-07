const app = angular.module('lg-password');

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

