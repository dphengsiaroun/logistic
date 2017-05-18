'use strict';

module.exports = 'lg-back-detector';

var app = angular.module(module.exports, []);

app.service('lgBackDetector', function LgBackDetector($rootScope, $location) {
	'ngInject';
	var service = this;
	$rootScope.$on('$locationChangeSuccess', function() {
		service.actualLocation = $location.path();
	});

	$rootScope.$watch(function() {
		return $location.path();
	}, function(newLocation, oldLocation) {
		if (service.actualLocation === newLocation) {
			service.isBack = true;
		} else {
			service.isBack = false;
		}

	});
});
