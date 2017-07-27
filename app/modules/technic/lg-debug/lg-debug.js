module.exports = 'lg-debug';

const app = angular.module(module.exports, []);

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

var counter = 0;

app.run(function($rootScope) {
	'ngInject';
	$rootScope.$watch(function() {
		console.log('$rootScope compilation', counter);
		counter++;
	});
});
