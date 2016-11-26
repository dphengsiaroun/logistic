(function() {
	'use strict';

	var app = angular.module('lg-config', []);

	app.run(['$injector', function ($injector) {
		console.log('lg-config run', arguments);
		var $rootScope = $injector.get('$rootScope');
		$rootScope.config = {};
		$rootScope.config.vehicleTypes = ['Benne', 'Frigo', 'Bâche'];
	}]);

	

})();
