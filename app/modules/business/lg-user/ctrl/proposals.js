const app = angular.module('lg-user');

app.config(function($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'user:proposals',
		url: '/{login}/proposals',
		component: 'lgUserProposalsRoute'
	});
});

const proposalsHtml = require('../tmpl/proposals.html');
app.component('lgUserProposalsRoute', {
	template: proposalsHtml,
	controller: function LgUserProposalsRouteCtrl($state, $stateParams, user, connection, proposal) {
		'ngInject';
		const ctrl = this;
		ctrl.user = user;
		ctrl.proposal = proposal;
		ctrl.proposals = [];
		console.log('user', user);
		ctrl.$onInit = function() {
			connection.waitForCheckConnection().then(function() {
				return proposal.list({
					userId: user.current.id
				});
			}).then(function(proposals) {
				console.log('proposals', proposals);
				ctrl.proposals = proposals;
			}).catch(function(error) {
				console.error('error', error);
			});
		};
	}
});
