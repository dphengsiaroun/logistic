export function config($stateProvider) {
	'ngInject';
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
			service: function($rootScope, connection) {
				'ngInject';
				return {
					questionMsg: 'Voulez vous vraiment vous déconnecter&nbsp;?',
					doNo: $rootScope.back,
					doYes: connection.delete
				};
			}
		},
		needsUser: true
	});
}

import connectionCreateHtml from './tmpl/connection-create.html';

class ConnectionCtrl {
	/* @ngInject */
	constructor(connection) {
		this.connection = connection;
		console.log('this.connection', this.connection);
	}
}

export const lgConnectionSigninRoute = {
	template: connectionCreateHtml,
	controller: ConnectionCtrl
};

