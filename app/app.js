(function() {
	'use strict';

	var app = angular.module('mainApp', [
		'ngSanitize',
		'vcRecaptcha',
		'lg-route',
		'lg-upload',
		'lg-menu',
		'lg-svg',
		'lg-user',
		'lg-carrier',
		'lg-loader',
		'lg-truck',
		'lg-choice',
		'lg-calendar',
		'lg-eyepassword',
		'lg-config',
		'lg-widget',
		'lg-debug',
		'lg-http',
		'lg-error',
		'lg-misc',
		'lg-num'
		]);

// permet de récuperer les valeurs en post sous format json
	app.run(function($rootScope, $window) {

		$rootScope.back = function() {
			console.log('back', arguments);
			$window.history.back();
		};

		$rootScope.goto = function(url) {
			console.log('goto', arguments);
			$window.location.href = url;
		};

	});

})();
