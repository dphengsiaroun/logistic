export function config($stateProvider) {
	'ngInject';
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
	$stateProvider.state({
		name: 'carrier:create:availability',
		url: '/carrier-create/availability',
		component: 'lgCarrierCreateAvailabilityRoute',
	});
	$stateProvider.state({
		name: 'carrier:create:pricing',
		url: '/carrier-create/pricing',
		component: 'lgCarrierCreatePricingRoute',
	});
	$stateProvider.state({
		name: 'carrier:create:trip:create',
		url: '/carrier-create/trip-create',
		component: 'lgCarrierCreateTripCreateRoute',
	});
	$stateProvider.state({
		name: 'carrier:create:truck:choose',
		url: '/carrier-create/truck-choose',
		component: 'lgCarrierCreateTruckChooseRoute',
	});
	$stateProvider.state({
		name: 'carrier:create:truck:create',
		url: '/carrier-create/truck-create',
		component: 'lgCarrierCreateTruckCreateRoute',
	});
	$stateProvider.state({
		name: 'carrier:create',
		url: '/carrier-create',
		component: 'lgCarrierCreateRoute',
	});
	$stateProvider.state({
		name: 'carrier:update',
		url: '/carrier/{id}/update',
		component: 'lgCarrierUpdateRoute'
	});
}
