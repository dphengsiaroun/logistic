const app = angular.module('lg-connection');

app.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state({
		name: 'connection:create',
		url: '/signin',
		component: 'lgConnectionSigninRoute'
	});

	$stateProvider.state({
		name: 'connection:delete',
		url: '/signout',
		component: 'lgPrompt',
		resolve: {
			service: ['$injector', function($injector) {
				var $rootScope = $injector.get('$rootScope');
				var connection = $injector.get('connection');
				return {
					questionMsg: 'Voulez vous vraiment vous déconnecter&nbsp;?',
					doNo: $rootScope.back,
					doYes: connection.delete
				};
			}]
		},
		needsUser: true
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

