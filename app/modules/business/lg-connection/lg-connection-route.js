'use strict';

const app = angular.module('lg-connection');

app.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state({
		name: 'connection:create',
		url: '/signin',
		component: 'lgConnectionSigninRoute'
	});

}]);

const connectionCreateUrl = require('./tmpl/connection-create.html');

class ConnectionCtrl {
	/* @ngInject */
	constructor(connection) {
		this.connection = connection;
		console.log('ConnectionCtrl.connection', this.connection);
	}
}

app.component('lgConnectionSigninRoute', {
	templateUrl: connectionCreateUrl,
	controller: ConnectionCtrl
});

