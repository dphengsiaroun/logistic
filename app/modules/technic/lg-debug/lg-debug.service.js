module.exports = 'lg-debug';

const app = angular.module(module.exports, []);

app.config(function($provide) {
	'ngInject';
	
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
		
		


		$delegate.$$checkUrlChange = function() {
			
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
			
		});
	};
});

app.run((lgDebug) => {
	lgDebug.start();
});
