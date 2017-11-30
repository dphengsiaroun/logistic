export function FormValidator() {
	'ngInject';
	this.isError = function(field) {
		return field.$invalid && field.$touched && field.$dirty;
	};
	this.isOk = function(field) {
		return field.$valid && field.$touched && field.$dirty;
	};

	this.check = (formCtrl) => {
		for (const field in formCtrl) {
			if (field.substr(0, 1) === '$') {
				continue;
			}
			formCtrl[field].$setTouched();
			formCtrl[field].$setDirty();
		}
		if (formCtrl.$valid) {
			return true;
		}
		const target = formCtrl.$$element[0].querySelector('.ng-invalid');
		target.focus();
		return false;
	};
}
