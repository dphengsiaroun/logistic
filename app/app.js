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
		'lg-choice',
		'lg-eyepassword',
		'lg-config',
		'lg-widget',
		'lg-debug',
		'lg-http',
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

// directives pour la création des balises
	app.directive('jlgHeader', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/jlg-header.html'
		};
	});

	app.directive('jlgBanner', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/jlg-banner.html'
		};
	});

	app.directive('jlgBannerpic', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/jlg-bannerpic.html'
		};
	});

	app.directive('jlgFooter', function() {
		return {
			restrict: 'E',
			templateUrl: 'tmpl/jlg-footer.html'
		};
	});


	

})();
