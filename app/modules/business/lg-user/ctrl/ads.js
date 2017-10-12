export function config($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'user:ads',
		url: '/{login}/ads',
		component: 'lgUserAdsRoute'
	});
}

import adsHtml from '../tmpl/ads.html';
export const lgUserAdsRoute = {
	template: adsHtml,
	controller: function LgUserAdsRouteCtrl($state, $stateParams, user, connection, carrier, loader) {
		'ngInject';
		const ctrl = this;
		ctrl.user = user;
		ctrl.carrier = carrier;
		ctrl.loader = loader;
		ctrl.carriers = [];
		ctrl.loaders = [];
		
		ctrl.$onInit = function() {
			connection.waitForCheckConnection().then(function() {
				return carrier.list({
					userId: user.current.id
				});
			}).then(function(carriers) {
				
				ctrl.carriers = carriers;
			}).then(function() {
				return loader.list({
					userId: user.current.id
				});
			}).then(function(loaders) {
				
				ctrl.loaders = loaders;
			}).catch(function(error) {
				console.error('error', error);
			});
		};
	}
};
