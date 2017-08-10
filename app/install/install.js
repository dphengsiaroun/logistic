import './style.css';

import 'angular-route';


import homeUrl from './tmpl/home.html';
import installUrl from './tmpl/install.html';
import successfullyInstalledUrl from './tmpl/successfully-installed.html';
import alreadyInstalledUrl from './tmpl/already-installed.html';
import installFailedUrl from './tmpl/install-failed.html';

function config($routeProvider) {
	'ngInject';
	$routeProvider
		.when('/', {
			template: homeUrl,
			controller: 'HomeCtrl',
			controllerAs: '$ctrl'
		})
		.when('/install', {
			template: installUrl
		})
		.when('/already-installed', {
			template: alreadyInstalledUrl
		})
		.when('/successfully-installed', {
			template: successfullyInstalledUrl
		})
		.when('/install-failed', {
			template: installFailedUrl
		})
		.otherwise({
			redirectTo: '/'
		});
}

function Install($rootScope, $http, $location, $window) {
	'ngInject';

	this.init = () => {};

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

}

angular.module('install', ['ngRoute'])
	.config(config)
	.service('install', Install)
	.run((install) => {
		install.init();
	})
	.controller('HomeCtrl', function HomeCtrl($rootScope) {
		console.log('HomeCtrl', arguments);
		$rootScope.isInstalled();
	});
