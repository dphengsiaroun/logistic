export function FormValidator() {
	'ngInject';
	this.isError = function(field) {
		return field.$invalid && field.$touched && field.$dirty;
	};
	this.isOk = function(field) {
		return field.$valid && field.$touched && field.$dirty;
	};
}
