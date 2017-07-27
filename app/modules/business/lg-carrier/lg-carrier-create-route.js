var app = angular.module('lg-carrier');

app.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state({
		name: 'carrier:created',
		url: '/created-carrier',
		component: 'lgMessage',
		resolve: {
			service: function(user) {
				'ngInject';
				var login = user.current.content.login;
				console.log('login', login);
				var state = 'carrier:list({login: \'' + login + '\'})';
				console.log('state', state);
				return {
					state: state,
					label: 'Voir les annonces de transport',
					message: 'Votre annonce de transport a bien été ajoutée.'
				};
			}
		},
		needsUser: true
	});


}]);

require('./ctrl/carrier-create.js');
require('./ctrl/carrier-create-truck-choose.js');
require('./ctrl/carrier-create-truck-create.js');
require('./ctrl/carrier-create-availability.js');
require('./ctrl/carrier-create-trip-create.js');
require('./ctrl/carrier-create-pricing.js');
