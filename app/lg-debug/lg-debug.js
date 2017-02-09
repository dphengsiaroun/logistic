'use strict';

module.exports = 'lg-debug';

var app = angular.module(module.exports, []);

app.config(['$provide', function($provide) {
	console.log('lg-debug config', arguments);
	$provide.decorator('$rootScope', ['$delegate', function($delegate) {
		var emit = $delegate.$emit;

		$delegate.$emit = function() {
			console.log.apply(console, arguments);
			emit.apply(this, arguments);
		};

		return $delegate;
	}]);
}]);

app.run(function($rootScope) {
	'ngInject';
	$rootScope.$watch(function() {
		console.log('$rootScope compilation', arguments);
	});
});
