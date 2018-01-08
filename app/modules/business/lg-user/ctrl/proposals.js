export function config($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'user:proposals',
		url: '/{login}/proposals',
		component: 'lgUserProposalsRoute'
	});
}

import proposalsHtml from '../tmpl/proposals.html';
export const lgUserProposalsRoute = {
	template: proposalsHtml,
	controller: function LgUserProposalsRouteCtrl($state, $stateParams, connection, proposal) {
		'ngInject';
		const ctrl = this;
		ctrl.proposal = proposal;
		ctrl.proposals = [];

		ctrl.limit = function() {
			this.limit = 50;
			console.log('ctrl.limit', ctrl);
		};
	
		ctrl.loadMore = function() {
			console.log('ctrl.loadMore', ctrl.loadMore);
				const moreData = ctrl.limit + 50;
				ctrl.limit = moreData > ctrl.proposal.length ? ctrl.proposal.length : moreData;
		};
		
		ctrl.$onInit = function() {
			connection.waitForCheckConnection().then(function() {
				return proposal.list({
					userId: connection.user.id
				});
			}).then(function(proposals) {
				ctrl.limit();
				ctrl.proposals = proposals;
			}).catch(function(error) {
				console.error('error', error);
			});
		};
	}
};
