(function() {
	'use strict';

	var app = angular.module('lg-misc', []);

	

	app.service('lgMisc', ['$injector', function LgMisc($injector) {
		
		this.isWebService  = function(url) {
			return url.match(/ws\/.*\.php/);
		};

	}]);


})();
