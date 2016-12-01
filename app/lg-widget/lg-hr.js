(function() {
	'use strict';

	var app = angular.module('lg-widget');

	app.directive('lgHr', ['$injector', function($injector) {
		var $compile = $injector.get('$compile');
		return {
			restrict: 'E',
			templateUrl: 'lg-widget/tmpl/lg-hr.html',
			transclude: true,
		};

	}]);
	
})();
