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

let timer = 0;

app.config(['$provide', function($provide) {
	$provide.decorator('$browser', function lgDebugDecorator($delegate) {
		const $$checkUrlChange = $delegate.$$checkUrlChange;
		console.log('this', this);
		console.log('$delegate', $delegate);


		$delegate.$$checkUrlChange = function() {
			console.log('%cdigest start', 'color: green');
			timer = performance.now();
			$$checkUrlChange.apply($delegate, arguments);
		};

		return $delegate;
	});
}]);

let counter = 0;

app.service('lgDebug', function LgDebug($rootScope, $timeout) {
	'ngInject';
	this.start = () => {
		console.log('lgDebug instantiate', counter);

		function postDigest(callback) {
			const unregister = $rootScope.$watch(function() {
				unregister();
				$timeout(function() {
					callback();
					postDigest(callback);
				}, 0, false);
			});
		}

		postDigest(function() {
			counter++;
			const diff = performance.now() - timer;
			console.log('%cCompilation %d, duration: %s', 'color: green', counter, diff.toFixed(3));
		});
	};
});

app.run((lgDebug) => {
	lgDebug.start();
});
