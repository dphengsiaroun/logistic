module.exports = 'lg-erasable';

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
				ng-click="erase()">
					<i class="fa fa-times-circle erasable" aria-hidden="true"></i>
				</div>`);
			element.after(elt);
			$compile(elt)(scope);

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
