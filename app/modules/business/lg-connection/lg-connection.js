'use strict';

module.exports = 'lg-connection';

const lgUser = require('../lg-user/lg-user.js');

const app = angular.module(module.exports, [lgUser]);

require('./lg-connection-route.js');

var makeUrl = function(str) {
	return 'ws/user/' + str + '.php';
};

app.service('connection', function Connection($http, $rootScope, user) {
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
			user.current = response.data.connection;
			$rootScope.isConnected = true;
			user.goToStateAfterConnect();
		}).catch(function(error) {
			service.error = error;
		});
	};

});
