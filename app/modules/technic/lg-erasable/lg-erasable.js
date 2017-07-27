module.exports = 'lg-erasable';

const app = angular.module(module.exports, []);

app.directive('lgErasable', () => {
	'ngInject';
	return {
		restrict: 'A',
		controller: function LgErasableCtrl($scope, $element, $compile) {
			'ngInject';
			console.log('LgErasableCtrl', arguments);
			const ctrl = this;

			$scope.lgErasableCtrl = ctrl;

			const elt = angular.element(`<div 
				class="erase" 
				ng-click="lgErasableCtrl.erase()">
					<i class="fa fa-times-circle erasable" aria-hidden="true"></i>
				</div>`);
			$element.after(elt);
			$compile(elt)($scope);
			
			ctrl.erase = () => {
				console.log('ctrl.erase');
			};

			
		}
	};
});
