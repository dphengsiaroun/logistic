

import './lg-user.scss';
import 'angular-ui-router';
window.Hashes = require('jshashes');
require('../../technic/lg-widget/lg-widget.js');
module.exports = 'lg-user';

const app = angular.module(module.exports, ['ui.router', 'lg-widget']);
require('./lg-user-route.js');
require('./ctrl/ads.js');
require('./ctrl/proposals.js');


const makeUrl = function(str) {
	return 'ws/user/' + str + '.php';
};

app.service('user', function User($injector, $http, $rootScope, $q, $state) {
	'ngInject';
	const service = this;
	const user = this;

	this.signupData = {
		content: {}
	};

	this.signup = function() {
		console.log('sign up');
		const SHA256 = new Hashes.SHA256;
		const data = angular.copy(service.signupData);
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
			user.isConnected = true;
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
			url: 'ws/users/' + service.updateData.id,
			method: 'PUT',
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
			url: 'ws/users/' + service.current.id,
			method: 'DELETE',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		}).then(function(response) {
			console.log('response', response);
			if (response.data.status === 'ko') {
				return $q.reject(response);
			}
			service.current = undefined;
			user.isConnected = false;
			$state.go('user:deleted');
		});
	};

	this.updatePasswordData = {
		oldPassword: 'test',
		newPassword: 'test'
	};

	this.updatePassword = function(data) {
		console.log('user->updatePassword', arguments);
		const SHA256 = new Hashes.SHA256;
		const hashedData = angular.copy(data);
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
