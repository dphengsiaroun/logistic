import Hashes from 'jshashes';

module.exports = 'lg-connection';

import lgUser from '../lg-user/lg-user.js';

const app = angular.module(module.exports, [lgUser]);
require('./lg-connection-route.js');

app.service('connection', function Connection($http, $rootScope, $injector, $q, $state, user) {
	'ngInject';
	const service = this;
	user.isConnected = undefined;
	service.createConnectionData = {};

	service.create = function() {
		console.log('sign in');
		const SHA256 = new Hashes.SHA256; // on crée la variable de cryptage
		$http({
			url: 'ws/connections',
			method: 'POST',
			data: {
				login: service.createConnectionData.login,
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
			user.isConnected = true;
			service.goToStateAfterConnect();
		}).catch(function(error) {
			service.error = error;
		});
	};

	service.isConnectedStatusKnown = false;

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
				user.isConnected = false;
				if ($state.$current.needsUser) {
					$state.go('home');
				}
				return;
			}
			user.isConnected = true;
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
			console.log('user.isConnected', user.isConnected);
			console.log('$state.$current.name', $state.$current.name);
			if (user.isConnected === true) {
				resolve();
				return;
			}
			if (user.isConnected === false) {
				reject();
				return;
			}
			const deregister = $rootScope.$watch('isConnected', function() {
				if (user.isConnected === true) {
					console.log('user.isConnected resolve', user.isConnected);
					deregister();
					resolve();
				} else if (user.isConnected === false) {
					console.log('user.isConnected reject', user.isConnected);
					deregister();
					reject();
				}
			});
		});
	};

	function refreshState() {
		service.waitForCheckConnection('needsUser').catch(function() {
			if ($state.$current.needsUser) {
				console.log('go to connection create because needsUser');
				$state.go('connection:create');
			}
		});
	}

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
			user.isConnected = false;
			$state.go('home');
		}).catch(function(error) {
			service.error = error;
		});
	};

	service.setAfterConnectAction = function(obj) {
		localStorage.setItem('afterConnect', angular.toJson(obj));
	};

	service.goToStateAfterConnect = function() {
		console.log('goToStateAfterConnect', arguments);
		const json = localStorage.getItem('afterConnect');
		localStorage.removeItem('afterConnect');
		if (json === null) {
			if ($state.$current.name === 'home') {
				return;
			}
			$state.go('home');
			return;
		}
		const obj = angular.fromJson(json);
		console.log('obj', obj);
		if (obj.fn && obj.service) {
			const service = $injector.get(obj.service);
			if (obj.fn in service) {
				console.log('about to apply obj.fn', obj.fn);
				service[obj.fn].apply(null, obj.args);
			}
		}
		console.log('after connect, go to', obj.state);
		$state.go(obj.state);
	};

});
