'use strict';

module.exports = 'lg-back-detector';

var app = angular.module(module.exports, []);

app.service('lgBackDetector', function LgBackDetector($rootScope, $location, $transitions, $window) {
	'ngInject';
	var service = this;
	service.last = undefined;
	$transitions.onStart({}, function(trans) {
		var from = trans.$from();
		console.log('lgBackDetector from', from);
		var to = trans.$to();
		console.log('lgBackDetector to', to);
		if (to === service.last) {
			service.isBack = true;
		} else {
			service.isBack = false;
		}
		service.last = from;
	});
});
