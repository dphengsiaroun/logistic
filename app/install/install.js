(function() {
	'use strict';

	var app = angular.module('mainApp', ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider) {

		$routeProvider
			.when('/', {
				templateUrl: 'tmpl/home.html',
				controller: 'HomeCtrl'
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
		var $location = $injector.get('$location');

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
				if (response.data.status === 'ok') {
					$location.path('/successfully-installed');
				} else {
					$rootScope.errorMsg = response.data;
					$location.path('/install-failed');
				}
				
			}).catch(function(error) {
				console.error('error', error);
			});
        };

		$rootScope.isInstalled = function() {
            console.log('isInstalled', arguments);
            $http({
				url: '../ws/isInstalled.php',
				method: 'GET'
			}).then(function(response) {
				console.log('response', response);
				if (response.data.answer === 'yes') {
					console.log('yes');
					$location.path('/already-installed');
				} else {
					console.log('no');
					$location.path('/install');
				}
			}).catch(function(error) {
				console.error('error', error);
			});
        };

		$rootScope.uninstall = function() {
            console.log('uninstall', arguments);
			 $http({
				url: '../ws/uninstall.php',
				method: 'GET'
			}).then(function(response) {
				console.log('response', response);
				$location.path('/install');
			}).catch(function(error) {
				console.error('error', error);
			});
        };

	}]);

	app.controller('HomeCtrl', ['$injector', function($injector) {
		console.log('HomeCtrl', arguments);
		var $rootScope = $injector.get('$rootScope');
		$rootScope.isInstalled();
	}]);

})();


