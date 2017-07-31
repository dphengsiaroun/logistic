module.exports = 'lg-filter-list';

const app = angular.module(module.exports, []);

app.service('lgFilterList', function LgFilterList($parse) {
	'ngInject';
	const service = this;
	service.setup = function($scope, ctrlAs, ctrl) {
		console.log('lgFilterList setup', arguments);
		$scope.$watch(ctrlAs, function() {
			console.log('lgFilterList watch', arguments);
			ctrl.filteredlist = $parse(
				'$ctrl.list | orderBy:"content.created_t": $ctrl.order | filter: $ctrl.filter'
			)({ $ctrl: ctrl });
			ctrl.removedByFilterLength = ctrl.list.length - ctrl.filteredlist.length;
			console.log('ctrl.filteredlist', ctrl.filteredlist);
			console.log('ctrl.removedByFilterLength', ctrl.removedByFilterLength);
		}, true);
	};
});
