import Hashes from 'jshashes';

export function Connection($http, $rootScope, $injector, $q, $state, user, lgConfig) {
	'ngInject';
	const service = this;
	service.isConnected = undefined;
	service.createConnectionData = {};
	$rootScope.connection = service;

	service.create = function() {
		console.log('sign in');
		const SHA256 = new Hashes.SHA256; // on crée la variable de cryptage
		$http({
			url: lgConfig.wsDir() + 'connections',
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
			service.isConnected = true;
			service.goToStateAfterConnect();
		}).catch(function(error) {
			service.error = error;
		});
	};

	service.check = function() {
		console.log('is connected?', arguments);
		if (service.isConnected !== undefined) {
			return;
		}
		$http({
			url: lgConfig.wsDir() + 'connections/12',
			method: 'GET'
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.current = undefined;
				service.isConnected = false;
				if ($state.$current.needsUser) {
					$state.go('home');
				}
				return;
			}
			service.isConnected = true;
			user.current = response.data.connection.user;
		}).catch(function(error) {
			service.error = error;
		});
	};

	service.check();

	service.waitForCheckConnection = function(reason) {
		return $q(function(resolve, reject) {
			console.log('waitForCheckConnection start with reason and state', reason, $state.$current.name);
			console.log('connection.isConnected', service.isConnected);
			console.log('$state.$current.name', $state.$current.name);
			if (service.isConnected === true) {
				resolve();
				return;
			}
			if (service.isConnected === false) {
				reject('No user connected');
				return;
			}
			const deregister = $rootScope.$watch('connection.isConnected', function() {
				if (service.isConnected === true) {
					console.log('connection.isConnected resolve', service.isConnected);
					deregister();
					resolve();
				} else if (service.isConnected === false) {
					console.log('connection.isConnected reject', service.isConnected);
					deregister();
					reject('No user connected');
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
			url: lgConfig.wsDir() + 'connections/12',
			method: 'DELETE'
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			user.current = undefined;
			service.isConnected = false;
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

}
