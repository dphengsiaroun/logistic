module.exports = 'lg-debug';

const app = angular.module(module.exports, []);

app.config(function($provide) {
	'ngInject';
	console.log('lg-debug config', arguments);
	$provide.decorator('$rootScope', function lgDebugDecorator($delegate) {
		'ngInject';
		const emit = $delegate.$emit;

		$delegate.$emit = function() {
			console.log.apply(console, arguments);
			emit.apply(this, arguments);
		};

		return $delegate;
	});
});

let counter = 0;

app.service('lgDebug', function LgDebug($rootScope) {
	'ngInject';
	this.start = () => {
		console.log('lgDebug instantiate', counter);
		$rootScope.$watch(function() {
			console.log('$rootScope compilation', counter);
			counter++;
		});
	};
});

app.run((lgDebug) => {
	lgDebug.start();
});
