export function config($stateProvider) {
	'ngInject';
	$stateProvider.state({
		name: 'proposal:create',
		url: '/{type}/{id}/create-proposal',
		component: 'lgProposalCreateRoute'
	});
	$stateProvider.state({
		name: 'proposal:created',
		url: '/created-proposal',
		component: 'lgMessage',
		resolve: {
			service: function() {
				const state = 'home';
				console.log('state', state);
				return {
					state: state,
					label: 'Retour à l\'accueil',
					message: 'Votre proposition a bien été envoyée.'
				};
			}
		},
		needsUser: true
	});
	$stateProvider.state({
		name: 'proposal:retrieve',
		url: '/proposal/{id}',
		component: 'lgProposalRetrieveRoute'
	});

	$stateProvider.state({
		name: 'proposal:update',
		url: '/proposal/{id}/update',
		component: 'lgProposalUpdateRoute'
	});
	$stateProvider.state({
		name: 'proposal:updated',
		url: '/updated-proposal',
		component: 'lgMessage',
		resolve: {
			service: function(user, truck, connection) {
				'ngInject';
				return connection.waitForCheckConnection().then(function() {
					const login = user.current.content.login;
					console.log('login', login);
					const state = 'user:proposals({login: \'' + login + '\'})';
					console.log('state', state);
					return {
						state: state,
						label: 'Revenir à la liste des propositions',
						message: 'Votre proposition a bien été modifiée.'
					};
				});
			}
		}
	});

	$stateProvider.state({
		name: 'proposal:delete',
		url: '/proposal/{id}/delete',
		component: 'lgConfirm',
		resolve: {
			service: function($rootScope, proposal, $stateParams) {
				'ngInject';
				const result = {};
				result.doCancel = function() {
					$rootScope.back();
				};
				result.doConfirm = function() {
					proposal.delete($stateParams.id).catch(function(error) {
						result.error = error;
					});
				};
				result.confirmationMsg = 'Voulez-vous vraiment supprimer cette annonce de chargement&nbsp;?';
				result.cancelMsg = 'Non, annuler';
				result.confirmMsg = 'Oui, supprimer';
				return result;
			}
		}
	});
	$stateProvider.state({
		name: 'proposal:deleted',
		url: '/deleted-proposal',
		component: 'lgMessage',
		resolve: {
			service: function(connection, user, proposal) {
				'ngInject';
				return connection.waitForCheckConnection('proposal:deleted').then(function() {
					const login = user.current.content.login;
					console.log('login', login);
					const state = 'user:proposals({login: \'' + login + '\'})';
					console.log('state', state);
					return {
						state: state,
						label: 'Voir mes propositions',
						message: 'Votre proposition a bien été supprimée.'
					};
				});
			}
		}
	});

	$stateProvider.state({
		name: 'proposal:mailsent',
		url: '/mail-sent',
		component: 'lgMessage',
		resolve: {
			service: function(user, truck, connection) {
				'ngInject';
				return connection.waitForCheckConnection().then(function() {
					const login = user.current.content.login;
					console.log('login', login);
					const state = 'user:proposals({login: \'' + login + '\'})';
					console.log('state', state);
					return {
						state: state,
						label: 'Revenir à la liste des propositions',
						message: 'Votre proposition a bien été envoyée.'
					};
				});
			}
		}
	});


}

import proposalCreateHtml from './tmpl/proposal-create.html';
import proposalDetailHtml from './tmpl/proposal-detail.html';
import proposalUpdateHtml from './tmpl/proposal-update.html';

import * as lib from './ctrl/lg-proposal-ctrl.js';

export const lgProposalCreateRoute = {
	template: proposalCreateHtml,
	controller: lib.ProposalCreateCtrl,
};

export const lgProposalRetrieveRoute = {
	template: proposalDetailHtml,
	controller: lib.ProposalCtrl,
};

export const lgProposalUpdateRoute = {
	template: proposalUpdateHtml,
	controller: lib.ProposalUpdateCtrl,
};
