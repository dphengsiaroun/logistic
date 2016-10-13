(function() {
	'use strict';

	var app = angular.module('mainApp', ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'tmpl/home.html'
			})
			.when('/install', {
				templateUrl: 'tmpl/install.html'
			})
            .when('/already-installed', {
				templateUrl: 'tmpl/already-installed.html'
			})
            .when('/successfully-installed', {
				templateUrl: 'tmpl/successfully-installed.html'
			})
            .when('/install-failed', {
				templateUrl: 'tmpl/install-failed.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);

    app.run(['$injector', function($injector) {

		var $rootScope = $injector.get('$rootScope');
		var $http = $injector.get('$http');

        $rootScope.obj = {
            hostname: 'localhost',
            username: 'root',
            password: '',
            databaseName: 'logistic'
        };

        $rootScope.install = function() {
            console.log('install', arguments);
            $http({
				url: '../ws/install.php',
				method: 'POST',
				data: $rootScope.obj,
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
			}).then(function(response) {
				console.log('response', response);
			}).catch(function(error) {
				console.error('error', error);
			});
        };

	}]);

})();


