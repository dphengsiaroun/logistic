module.exports = 'lg-erasable';

import './lg-erasable.scss';

const app = angular.module(module.exports, []);

app.directive('lgErasable', function lgErasable($compile) {
	'ngInject';
	return {
		restrict: 'A',
		require: '?ngModel',
		scope: {},
		controller: function() {
			
		},
		link: function(scope, element, attrs, ctrl) {
			

			const elt = angular.element(`<div 
				class="erase" 
				ng-show="isNotEmpty()"
				ng-click="erase()">
					<i class="fa fa-times-circle erasable" aria-hidden="true"></i>
				</div>`);
			element.after(elt);
			$compile(elt)(scope);

			scope.isNotEmpty = () => {
				// 
				if (ctrl) {
					// 

					return !ctrl.$isEmpty(ctrl.$modelValue);
				}
				return false;
			};

			scope.erase = () => {
				
				if (ctrl) {
					ctrl.$setViewValue('');
					ctrl.$render();
				}
			};
		}
	};
});
