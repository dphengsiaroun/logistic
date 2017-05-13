'use strict';

var app = angular.module('lg-user');

app.config(function($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'user:proposals',
		url: '/{login}/proposals',
		component: 'lgUserProposalsRoute'
	});
});

var proposalsUrl = require('../tmpl/proposals.html');
app.component('lgUserProposalsRoute', {
	templateUrl: proposalsUrl,
	controller: function LgUserProposalsRouteCtrl($state, $stateParams, user, proposal) {
		'ngInject';
		var ctrl = this;
		ctrl.user = user;
		ctrl.proposal = proposal;
		ctrl.proposals = [];
		console.log('user', user);
		ctrl.$onInit = function() {
			user.waitForCheckConnection().then(function() {
				return proposal.list({
					accountId: user.account.id
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
