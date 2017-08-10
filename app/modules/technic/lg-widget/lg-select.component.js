export const lgSelect = {
	require: {
		ngModel: 'ngModel',
	},
	controller: function LgSelectCtrl($scope, $element, $compile) {
		'ngInject';
		console.log('LgSelectCtrl', arguments);
		const ctrl = this;
		let isInit = true;
		ctrl.update = function(value) {
			console.log('lgSelect update', arguments);
			ctrl.ngModel.$setViewValue(value);
			ctrl.ngModel.$render();
			ctrl.ngModel.$setTouched();
		};
		ctrl.$onInit = function() {
			ctrl.ngModel.$render = function() {
				console.log('lgSelect $render', arguments);
				const value = ctrl.ngModel.$viewValue;
				console.log('lgSelect value', value);
				const elts = $element.find('lg-option');
				console.log('lgSelect elts', elts);
				elts.removeAttr('selected');
				const elt = angular.element($element[0].querySelector('lg-option[value=' + value + ']'));
				elt.attr('selected', '');
				if (isInit) {
					const optionElts = $element.find('lg-option');
					for (let i = 0; i < optionElts.length; i++) {
						const e = angular.element(optionElts[i]);
						const val = e.attr('value');
						e.attr('ng-click', '$ctrl.update(\'' + val + '\')');
					}
					$compile($element.contents())($scope);
				}
				isInit = false;
			};
		};
	}
};
