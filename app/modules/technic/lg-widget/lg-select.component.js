export const lgSelect = {
	require: {
		ngModel: 'ngModel',
	},
	controller: function LgSelectCtrl($scope, $element, $compile) {
		'ngInject';
		
		const ctrl = this;
		let isInit = true;
		ctrl.update = function(value) {
			
			ctrl.ngModel.$setViewValue(value);
			ctrl.ngModel.$render();
			ctrl.ngModel.$setTouched();
		};
		ctrl.$onInit = function() {
			ctrl.ngModel.$render = function() {
				
				const value = ctrl.ngModel.$viewValue;
				
				const elts = $element.find('lg-option');
				
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
