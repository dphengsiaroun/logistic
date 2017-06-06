'use strict';

require('./lg-user.scss');
module.exports = 'lg-user';

var app = angular.module(module.exports, []);
require('./lg-user-route.js');
require('./ctrl/ads.js');
require('./ctrl/proposals.js');


var makeUrl = function(str) {
	return 'ws/user/' + str + '.php';
};

app.service('user', function User($injector, $http, $rootScope, $q, $state) {
	'ngInject';
	var service = this;

	this.signupData = {
		email: 'dphengsiaroun@outlook.fr',
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
			},
			profile: 'both'
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
			service.current = response.data.user;
			$rootScope.isConnected = true;
			$state.go('user:create:success');
		}).catch(function(error) {
			service.error = error;
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
			service.current = response.data.user;
			$state.go('user:updated');
		}).catch(function(error) {
			service.error = error;
		});
	};

	this.delete = function() {
		console.log('user->delete', service.current);

		return $http({
			url: makeUrl('delete'),
			method: 'POST',
			data: {
				id: service.current.id
			},
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				return $q.reject(response);
			}
			service.current = undefined;
			$rootScope.isConnected = false;
			$state.go('user:deleted');
		});
	};

	this.updatePasswordData = {
		oldPassword: 'test',
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
			service.current = response.data.user;
			$state.go('user:updatedPassword');
		}).catch(function(error) {
			console.error('error', error);
			service.error = error;
		});
	};
});

var initCtrl = function(ctrl, $scope, $injector) {
	ctrl.user = $injector.get('user');
	ctrl.connection = $injector.get('connection');
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
	$scope.$watch('$ctrl.user.current', function() {
		if (ctrl.user.current) {
			ctrl.user.updateData = angular.copy(ctrl.user.current);
		}
	});
};

app.controller('UserCtrl', ['$scope', '$injector', function UserCtrl($scope, $injector) {
	initCtrl(this, $scope, $injector);
}]);

app.controller('UserUpdateCtrl', ['$scope', '$injector', function UserUpdateCtrl($scope, $injector) {
	initCtrl(this, $scope, $injector);
}]);
