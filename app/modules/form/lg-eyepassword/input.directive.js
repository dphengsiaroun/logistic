export function inputDirective($compile) {
	'ngInject';
	return {
		restrict: 'E',
		require: '?ngModel',
		link: function(scope, element, attr, ctrl) {
			if (attr.type !== 'eyepassword') {
				return;
			}
			

			const elt = angular.element('<!-- input type="eyepassword" ng-model="' + attr.ngModel + '" -->' +
				'<lg-eyepassword password="' + attr.ngModel +
				'" placeholder="' + attr.placeholder + '" name="' + attr.name + '"></lg-eyepassword>');
			element.after(elt);
			element.attr('style', 'display: none !important');
			$compile(elt)(scope);
			scope.$watch(attr.ngModel, function() {
				if (!ctrl) {
					return;
				}
				ctrl.$setDirty();
				if (ctrl.$$parentForm[attr.name + '-crypted'].$touched ||
					ctrl.$$parentForm[attr.name + '-clear'].$touched) {
					ctrl.$setTouched();
				}
			});
		}
	};
}