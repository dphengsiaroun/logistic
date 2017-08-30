export function Install($rootScope, $http, $location, $window) {
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