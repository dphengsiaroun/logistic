import './lg-form-validator.scss';
module.exports = 'lg-form-validator';

const app = angular.module(module.exports, []);

app.service('formValidator', function FormValidator() {
	this.isError = function(field) {
		return field.$invalid && field.$touched && field.$dirty;
	};
	this.isOk = function(field) {
		return field.$valid && field.$touched && field.$dirty;
	};
});
