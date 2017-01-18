'use strict';

require('./lg-user.css');
module.exports = 'lg-user';

var app = angular.module(module.exports, []);
require('./lg-user-route.js');


var makeUrl = function(str) {
	return 'ws/user/' + str + '.php';
};

app.service('user', function User($injector) {
	var $http = $injector.get('$http');
	var $state = $injector.get('$state');
	var $rootScope = $injector.get('$rootScope');
	var $q = $injector.get('$q');

	var service = this;

	var refreshState = function() {
		service.waitForCheckConnection('needsUser').catch(function() {
			if ($state.$current.needsUser) {
				console.log('go to signin because the state needs user');
				$state.go('user:signin');
			}
		});
	};

	$rootScope.$on('$viewContentLoaded', refreshState);
	this.afterConnectAction = {
		state: 'home',
		fn: undefined,
		args: undefined
	};

	this.goToStateAfterConnect = function() {

		if (service.afterConnectAction.fn) {
			service.afterConnectAction.fn.apply(null, service.afterConnectAction.args);
		}
		console.log('after connect, go to', service.afterConnectAction.state);
		$state.go(service.afterConnectAction.state);

		service.afterConnectAction = {
			state: 'home',
			fn: undefined,
			args: undefined
		};
	};

	this.signupData = {
		email: 'email@email.com',
		password: 'test',
		content: {
			lastname: 'Debbah',
			firstname: 'Mérouane',
			login: 'Meme',
			address: {
				street: '99 rue de Paris',
				city: 'Torcy',
				zipcode: '77200',
				country: 'France'
			}
		}
	};

	this.signup = function() {
		console.log('sign up');
		var SHA256 = new Hashes.SHA256;
		var data = angular.copy(service.signupData);
		data.password = SHA256.hex(service.signupData.password);

		$http({
			url: makeUrl('signup'),
			method: 'POST',
			data: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.account = response.data.account;
			$rootScope.isConnected = true;
			$state.go('user:signupSuccess');
		}).catch(function(error) {
			service.error = error;
		});
	};

	this.signinData = {
		email: 'email@email.com',
		password: 'test'
	};

	this.signin = function() {
		console.log('sign in');
		var SHA256 = new Hashes.SHA256; // on crée la variable de cryptage
		$http({
			url: makeUrl('signin'),
			method: 'POST',
			data: {
				email: service.signinData.email,
				// permet de crypter le password
				password: SHA256.hex(service.signinData.password)
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.account = response.data.account;
			$rootScope.isConnected = true;
			service.goToStateAfterConnect();
		}).catch(function(error) {
			service.error = error;
		});
	};

	this.retrieveFromCode = function(id, code) {
		console.log('sign in with code');
		console.log('code', code);
		console.log('id', id);
		$http({
			url: makeUrl('retrieveFromCode'),
			method: 'POST',
			data: {
				code: code,
				id: id
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				$state.go('error');
				return;
			}
			service.error = undefined;
			service.account = response.data.account;
		}).catch(function(error) {
			service.error = error;
		});
	};

	this.signout = function() {
		console.log('sign out');
		$http({
			url: makeUrl('signout'),
			method: 'GET'
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.account = undefined;
			$rootScope.isConnected = false;
			$state.go('home');
		}).catch(function(error) {
			service.error = error;
		});
	};

	$rootScope.isConnected = undefined;
	this.isConnected = function() {
		console.log('is connected?', arguments);
		if (service.isConnectedStatusKnown) {
			return;
		}
		$http({
			url: makeUrl('isConnected'),
			method: 'GET'
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.account = undefined;
				$rootScope.isConnected = false;
				if ($state.$current.needsUser) {
					$state.go('home');
				}
				return;
			}
			$rootScope.isConnected = true;
			service.account = response.data.account;
		}).finally(function() {
			service.isConnectedStatusKnown = true;
		}).catch(function(error) {
			service.error = error;
		});
	};

	this.isConnected();

	this.waitForCheckConnection = function(reason) {
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

	this.updateData = {
		content: {}
	};
	console.log('this.updateData', this.updateData);

	this.update = function() {
		console.log('user->update');

		$http({
			url: makeUrl('update'),
			method: 'POST',
			data: service.updateData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.account = response.data.account;
			$state.go('user:updated');
		}).catch(function(error) {
			service.error = error;
		});
	};

	this.delete = function() {
		console.log('user->delete', service.account);

		return $http({
			url: makeUrl('delete'),
			method: 'POST',
			data: {
				id: service.account.id
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				return $q.reject(response);
			}
			service.account = undefined;
			$rootScope.isConnected = false;
			$state.go('user:deleted');
		});
	};

	this.updatePasswordData = {
		oldPassword: 'test',
		newPassword: 'test'
	};

	this.forgottenPasswordData = {
		newPassword: 'test'
	};

	this.updatePassword = function(data) {
		console.log('user->updatePassword', arguments);
		var SHA256 = new Hashes.SHA256;
		var hashedData = angular.copy(data);
		if (hashedData.oldPassword) {
			hashedData.oldPassword = SHA256.hex(hashedData.oldPassword);
		}
		if (hashedData.newPassword) {
			hashedData.newPassword = SHA256.hex(hashedData.newPassword);
		}
		$http({
			url: makeUrl('updatePassword'),
			method: 'POST',
			data: hashedData,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.account = response.data.account;
			$state.go('user:updatedPassword');
		}).catch(function(error) {
			console.error('error', error);
			service.error = error;
		});
	};

	this.forgottenPasswordData = {
		email: 'dphengsiaroun@gmail.com',
		type: 'forgotten-password'
	};

	this.forgottenPassword = function(data) {
		console.log('user->forgottenPasswordData');

		// TODO: include recaptcha data
		$http({
			url: makeUrl('sendmail'),
			method: 'POST',
			data: data,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				service.error = response;
				return;
			}
			service.error = undefined;
			service.account = response.data.account;
			$state.go('user:forgottenPassword:mailsent');
		}).catch(function(error) {
			console.error('error', error);
			service.error = error;
		});
	};

});

var initCtrl = function(ctrl, $scope, $injector) {
	ctrl.user = $injector.get('user');
	ctrl.user.error = undefined;
	$scope.$watch('$ctrl.user.signupData.content.login', function() {
		console.log('ctrl.user', ctrl.user);
		console.log('ctrl.user.signupData.content.login', ctrl.user.signupData.content.login);
		ctrl.user.signupData.content.login = angular.lowercase(ctrl.user.signupData.content.login);
	});
	$scope.$watch('$ctrl.user.updateData.content.login', function() {
		console.log('ctrl.user', ctrl.user);
		console.log('ctrl.user.updateData.content.login', ctrl.user.updateData.content.login);
		ctrl.user.updateData.content.login = angular.lowercase(ctrl.user.updateData.content.login);
	});
	$scope.$watch('$ctrl.user.account', function() {
		if (ctrl.user.account) {
			ctrl.user.updateData = angular.copy(ctrl.user.account);
		}
	});
};

app.controller('UserCtrl', ['$scope', '$injector', function UserCtrl($scope, $injector) {
	initCtrl(this, $scope, $injector);
}]);

app.controller('UserUpdateCtrl', ['$scope', '$injector', function UserUpdateCtrl($scope, $injector) {
	initCtrl(this, $scope, $injector);
}]);

app.controller('UserChooseNewPasswordCtrl', function UserChooseNewPasswordCtrl($scope, $injector) {
	initCtrl(this, $scope, $injector);
	var $location = $injector.get('$location');
	var code = $location.search().code;
	var id = $location.search().id;
	this.user.retrieveFromCode(id, code);
	this.user.forgottenPasswordData.id = id;
	this.user.forgottenPasswordData.code = code;
});
