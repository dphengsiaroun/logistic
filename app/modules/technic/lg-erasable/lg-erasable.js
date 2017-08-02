module.exports = 'lg-erasable';

import './lg-erasable.scss';

const app = angular.module(module.exports, []);

app.directive('lgErasable', function($compile) {
	'ngInject';
	return {
		restrict: 'A',
		require: '?ngModel',
		scope: {},
		controller: function() {
			console.log('lgErasable ctrl', arguments);
		},
		link: function(scope, element, attrs, ctrl) {
			console.log('lgErasable link', arguments);

			const elt = angular.element(`<div 
				class="erase" 
				ng-show="isNotEmpty()"
				ng-click="erase()">
					<i class="fa fa-times-circle erasable" aria-hidden="true"></i>
				</div>`);
			element.after(elt);
			$compile(elt)(scope);

			scope.isNotEmpty = () => {
				// console.log('ctrl.isNotEmpty', ctrl);
				if (ctrl) {
					console.log('$modelValue', ctrl.$modelValue);

					return !ctrl.$isEmpty(ctrl.$modelValue);
				}
				return false;
			};

			scope.erase = () => {
				console.log('ctrl.erase', ctrl);
				if (ctrl) {
					ctrl.$setViewValue('');
					ctrl.$render();
				}
			};
		}
	};
});
