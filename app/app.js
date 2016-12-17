(function() {
	'use strict';

	var app = angular.module('mainApp', [
		'ngSanitize',
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
		]);

// permet de récuperer les valeurs en post sous format json
	app.run(['$injector', function($injector) {
		var $rootScope = $injector.get('$rootScope');
		var $window = $injector.get('$window');

		$rootScope.back = function() {
			console.log('back', arguments);
			$window.history.back();
		};

	}]);

})();
