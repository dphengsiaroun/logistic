const app = angular.module('lg-proposal');

app.config(['$stateProvider', function($stateProvider) {

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


}]);

app.controller('ProposalCtrl', function ProposalCtrl($scope, $injector, connection) {
	'ngInject';
	const ctrl = this;
	ctrl.proposal = $injector.get('proposal');
	ctrl.user = $injector.get('user');
	ctrl.isEditable = false;
	const $stateParams = $injector.get('$stateParams');
	console.log('ctrl.proposal', ctrl.proposal);
	console.log('$stateParams', $stateParams);
	ctrl.$onInit = function() {
		ctrl.proposal.get($stateParams.id).then(function() {
			return connection.waitForCheckConnection();
		}).then(function() {
			ctrl.isEditable = (ctrl.proposal.current.content.userId === ctrl.user.current.id);
			console.log('ctrl.isEditable', ctrl.isEditable);
		});
	};
});

app.controller('ProposalCreateCtrl', function ProposalCreateCtrl($scope, $window, $stateParams, proposal,
	user, connection, loader, carrier, formValidator) {
	'ngInject';
	const ctrl = this;
	ctrl.proposal = proposal;
	ctrl.loader = loader;
	ctrl.carrier = carrier;
	ctrl.user = user;
	ctrl.fv = formValidator;
	console.log('ProposalCreateCtrl', arguments);
	this.$onInit = function() {
		console.log('ProposalCreateCtrl init', arguments);
		connection.waitForCheckConnection('ProposalCreateCtrl').then(function() {
			console.log('connection ok', $stateParams);
			ctrl.proposal.createData.name = ctrl.user.current.content.login;
			ctrl.proposal.createData.email = ctrl.user.current.email;
			ctrl.proposal.createData.proposalAccountId = ctrl.user.current.id;
			ctrl.proposal.createData.adId = $stateParams.id;

			if ($stateParams.type === 'loader') {
				ctrl.proposal.createData.titleAd = ctrl[$stateParams.type].current.content.title;
			} else {
				ctrl.proposal.createData.titleAd = ctrl[$stateParams.type].current.content.truck.name;
			}

			if ($stateParams.type === 'loader') {
				ctrl.proposal.createData.imageUrl = ctrl[$stateParams.type].current.content.image.url;
			} else {
				ctrl.proposal.createData.imageUrl = ctrl[$stateParams.type].current.content.truck.image.url;
			}
			ctrl.proposal.createData.adAccountId = ctrl[$stateParams.type].current.content.userId;
			ctrl.proposal.createData.adType = $stateParams.type;
			console.log('ctrl.proposal.createData', ctrl.proposal.createData);
			console.log('ctrl.proposal.createData.adType', ctrl.proposal.createData.adType);
		}).catch(function() {
			console.error('you should not see this');
		});
	};
});

app.controller('ProposalUpdateCtrl', function ProposalUpdateCtrl($scope, $stateParams, 
	proposal, user, connection, formValidator) {
	'ngInject';
	const ctrl = this;
	ctrl.proposal = proposal;
	ctrl.user = user;
	ctrl.fv = formValidator;	
	this.$onInit = function() {
		ctrl.proposal.get($stateParams.id).then(function() {
			return connection.waitForCheckConnection('ProposalUpdateCtrl');
		}).then(function() {
			ctrl.proposal.updateData = angular.copy(ctrl.proposal.current.content);
			ctrl.proposal.updateData.id = $stateParams.id;
			console.log('ctrl.proposal.updateData', ctrl.proposal.updateData);
		}).catch(function() {
			console.error('you should not see this');
		});
	};
});

import proposalCreateHtml from './tmpl/proposal-create.html';
import proposalDetailHtml from './tmpl/proposal-detail.html';
import proposalUpdateHtml from './tmpl/proposal-update.html';

app.component('lgProposalCreateRoute', {
	template: proposalCreateHtml,
	controller: 'ProposalCreateCtrl',
});

app.component('lgProposalRetrieveRoute', {
	template: proposalDetailHtml,
	controller: 'ProposalCtrl',
});

app.component('lgProposalUpdateRoute', {
	template: proposalUpdateHtml,
	controller: 'ProposalUpdateCtrl',
});
