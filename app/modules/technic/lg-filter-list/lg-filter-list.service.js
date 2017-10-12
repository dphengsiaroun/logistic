module.exports = 'lg-filter-list';

const app = angular.module(module.exports, []);

app.service('lgFilterList', function LgFilterList($parse) {
	'ngInject';
	const service = this;
	service.setup = function($scope, ctrlAs, ctrl) {
		
		$scope.$watch(ctrlAs, function() {
			
			ctrl.filteredlist = $parse(
				'$ctrl.list | orderBy:"content.created_t": $ctrl.order | filter: $ctrl.filter'
			)({ $ctrl: ctrl });
			ctrl.removedByFilterLength = ctrl.list.length - ctrl.filteredlist.length;
			
			
		}, true);
	};
});
