const app = angular.module('lg-carrier');

app.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state({
		name: 'carrier:created',
		url: '/created-carrier',
		component: 'lgMessage',
		resolve: {
			service: function(user) {
				'ngInject';
				const login = user.current.content.login;
				console.log('login', login);
				const state = 'carrier:list({login: \'' + login + '\'})';
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

import './ctrl/carrier-create.js';
import './ctrl/carrier-create-truck-choose.js';
import './ctrl/carrier-create-truck-create.js';
import './ctrl/carrier-create-availability.js';
import './ctrl/carrier-create-trip-create.js';
import './ctrl/carrier-create-pricing.js';
