export function PasswordCtrl(password, user, formValidator) {
	'ngInject';
	this.password = password;
	this.user = user;
	this.fv = formValidator;
}

export function UserChooseNewPasswordCtrl($location, password, user, formValidator) {
	'ngInject';
	this.password = password;
	this.user = user;
	this.fv = formValidator;
	
	const code = $location.search().code;
	const id = $location.search().id;
	password.retrieveFromCode(id, code);
	password.forgottenPasswordData.id = id;
	password.forgottenPasswordData.code = code;
}

