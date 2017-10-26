module.exports = 'lg-back-detector';

const app = angular.module(module.exports, []);

app.service('lgBackDetector', function LgBackDetector($rootScope, $location, $transitions, $window) {
	'ngInject';
	const service = this;
	service.last = undefined;
	$transitions.onStart({}, function(trans) {
		const from = trans.$from();
		console.log('from', from);
		const to = trans.$to();
		console.log('to', to);
		if (to === service.last) {
			service.isBack = true;
		} else {
			service.isBack = false;
		}
		service.last = from;
	});
});
