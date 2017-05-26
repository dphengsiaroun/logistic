'use strict';

module.exports = 'lg-connection';

const lgUser = require('../lg-user/lg-user.js');
const app = angular.module(module.exports, [lgUser]);

require('./lg-connection-route.js');

app.service('connection', function Connection($http, $rootScope, $q, $state, user) {
	'ngInject';
	const service = this;
	service.createConnectionData = {
		email: 'email@email.com',
		password: 'test'
	};

	service.create = function() {
		console.log('sign in');
		var SHA256 = new Hashes.SHA256; // on crée la variable de cryptage
		$http({
			url: 'ws/connections',
			method: 'POST',
			data: {
				email: service.createConnectionData.email,
				// permet de crypter le password
				password: SHA256.hex(service.createConnectionData.password)
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			user.current = response.data.connection.user;
			$rootScope.isConnected = true;
			user.goToStateAfterConnect();
		}).catch(function(error) {
			service.error = error;
		});
	};

	service.isConnectedStatusKnown = false;

	$rootScope.isConnected = undefined;

	service.isConnected = function() {
		console.log('is connected?', arguments);
		if (service.isConnectedStatusKnown) {
			return;
		}
		$http({
			url: 'ws/connections/12',
			method: 'GET'
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.current = undefined;
				$rootScope.isConnected = false;
				if ($state.$current.needsUser) {
					$state.go('home');
				}
				return;
			}
			$rootScope.isConnected = true;
			user.current = response.data.connection.user;
		}).finally(function() {
			service.isConnectedStatusKnown = true;
		}).catch(function(error) {
			service.error = error;
		});
	};

	service.isConnected();

	service.waitForCheckConnection = function(reason) {
		return $q(function(resolve, reject) {
			console.log('waitForCheckConnection start with reason and state', reason, $state.$current.name);
			console.log('$rootScope.isConnected', $rootScope.isConnected);
			console.log('$state.$current.name', $state.$current.name);
			if ($rootScope.isConnected === true) {
				resolve();
				return;
			}
			if ($rootScope.isConnected === false) {
				reject();
				return;
			}
			var deregister = $rootScope.$watch('isConnected', function() {
				if ($rootScope.isConnected === true) {
					console.log('$rootScope.isConnected resolve', $rootScope.isConnected);
					deregister();
					resolve();
				} else if ($rootScope.isConnected === false) {
					console.log('$rootScope.isConnected reject', $rootScope.isConnected);
					deregister();
					reject();
				}
			});
		});
	};

	var refreshState = function() {
		service.waitForCheckConnection('needsUser').catch(function() {
			if ($state.$current.needsUser) {
				console.log('go to connection create because needsUser');
				$state.go('connection:create');
			}
		});
	};

	$rootScope.$on('$viewContentLoaded', refreshState);

	service.delete = function() {
		console.log('sign out');
		$http({
			url: 'ws/connections/12',
			method: 'DELETE'
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			user.current = undefined;
			$rootScope.isConnected = false;
			$state.go('home');
		}).catch(function(error) {
			service.error = error;
		});
	};

	service.setAfterConnectAction = function(obj) {
		localStorage.setItem('afterConnect', angular.toJson(obj));
	};

});
