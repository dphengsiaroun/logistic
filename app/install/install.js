require('angular');
require('angular-route');
require('font-awesome/css/font-awesome.css');
require('./style.css');

var homeUrl = require('./tmpl/home.html');
var installUrl = require('./tmpl/install.html');
var successfullyInstalledUrl = require('./tmpl/successfully-installed.html');
var alreadyInstalledUrl = require('./tmpl/already-installed.html');
var installFailedUrl = require('./tmpl/install-failed.html');


const app = angular.module('mainApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: homeUrl,
			controller: 'HomeCtrl'
		})
		.when('/install', {
			templateUrl: installUrl
		})
		.when('/already-installed', {
			templateUrl: alreadyInstalledUrl
		})
		.when('/successfully-installed', {
			templateUrl: successfullyInstalledUrl
		})
		.when('/install-failed', {
			templateUrl: installFailedUrl
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

app.run(['$injector', function($injector) {

	var $rootScope = $injector.get('$rootScope');
	var $http = $injector.get('$http');
	var $location = $injector.get('$location');
	var $window = $injector.get('$window');

	$rootScope.obj = {};

	$rootScope.initObj = function() {
		console.log('initObj', arguments);
		$http({
			url: '../ws/install/init-obj.php',
			method: 'GET'
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ok') {
				$rootScope.obj = response.data.obj;
			}
			$rootScope.obj.appUrl = $window.location.href.substring(0, $window.location.href.indexOf('#'));
		}).catch(function(error) {
			console.error('error', error);
		});
	};

	$rootScope.initObj();

	$rootScope.install = function() {
		console.log('install', arguments);
		$http({
			url: '../ws/install/install.php',
			method: 'POST',
			data: $rootScope.obj,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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
			url: '../ws/install/isInstalled.php',
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
			url: '../ws/install/uninstall.php',
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


