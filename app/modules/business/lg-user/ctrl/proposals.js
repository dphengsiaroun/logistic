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
		
		ctrl.$onInit = function() {
			connection.waitForCheckConnection().then(function() {
				return proposal.list({
					userId: connection.user.id
				});
			}).then(function(proposals) {
				
				ctrl.proposals = proposals;
			}).catch(function(error) {
				console.error('error', error);
			});
		};
	}
};
