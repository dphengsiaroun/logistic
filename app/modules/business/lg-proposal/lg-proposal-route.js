'use strict';

var app = angular.module('lg-proposal');

app.config(['$stateProvider', function($stateProvider) {

	$stateProvider.state({
		name: 'proposal:create',
		url: '/create-proposal/{id}',
		component: 'lgProposalCreateRoute'
	});
	$stateProvider.state({
		name: 'proposal:created',
		url: '/created-proposal',
		component: 'lgMessage',
		resolve: {
			service: function() {
				var state = 'home';
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

}]);

app.controller('ProposalListCtrl', function ProposalListCtrl(proposal) {
	'ngInject';
	var ctrl = this;
	ctrl.proposal = proposal;
	ctrl.$onInit = function() {
		proposal.list().then(function(proposals) {
			console.log('proposals', proposals);
			ctrl.proposals = proposals;
		}).catch(function(error) {
			console.error('error', error);
		});
	};
});

app.controller('ProposalCtrl', function ProposalCtrl($scope, $stateParams, proposal, user) {
	'ngInject';
	var ctrl = this;
	ctrl.proposal = proposal;
	ctrl.user = user;
	ctrl.isEditable = false;
	console.log('ctrl.proposal', ctrl.proposal);
	console.log('$stateParams', $stateParams);
	ctrl.$onInit = function() {
		ctrl.proposal.get($stateParams.id).then(function() {
			return ctrl.user.waitForCheckConnection('ProposalCtrl');
		}).then(function() {
			ctrl.isEditable = (ctrl.proposal.current.content.userId === ctrl.user.current.id);
			console.log('ctrl.isEditable', ctrl.isEditable);
		}).catch(function() {
			ctrl.isEditable = false;
			console.log('ctrl.isEditable', ctrl.isEditable);
		});
	};
});

app.controller('ProposalCreateCtrl', function ProposalCreateCtrl($scope, $window, $stateParams, proposal, user, loader, carrier) {
	'ngInject';
	var ctrl = this;
	ctrl.proposal = proposal;
	ctrl.loader = loader;
	ctrl.carrier = carrier;
	ctrl.user = user;
	console.log('arguments', arguments);
	this.$onInit = function() {
		ctrl.proposal.get($stateParams.id).then(function() {
			return ctrl.user.waitForCheckConnection('ProposalCreateCtrl');
		}).then(function() {
			ctrl.proposal.createData.name = ctrl.user.current.content.login;
			ctrl.proposal.createData.email = ctrl.user.current.email;
			ctrl.proposal.createData.proposalAccountId = ctrl.user.current.id;
			ctrl.proposal.createData.adId = $stateParams.id;
			ctrl.proposal.createData.titleAd = ctrl.loader.current.content.title;
			ctrl.proposal.createData.adAccountId = ctrl.loader.current.content.userId;
			ctrl.proposal.createData.adType = 'loader';
			console.log('ctrl.proposal.createData', ctrl.proposal.createData);
		}).catch(function() {
			console.error('you should not see this');
		});
	};
});

app.controller('ProposalUpdateCtrl', function ProposalUpdateCtrl($scope, proposal, user, $stateParams) {
	'ngInject';
	var ctrl = this;
	ctrl.proposal = proposal;
	ctrl.user = user;
	this.$onInit = function() {
		ctrl.proposal.get($stateParams.id).then(function() {
			return ctrl.user.waitForCheckConnection('ProposalUpdateCtrl');
		}).then(function() {
			ctrl.proposal.updateData = angular.copy(ctrl.proposal.current.content);
			ctrl.proposal.updateData.id = $stateParams.id;
			console.log('ctrl.proposal.updateData', ctrl.proposal.updateData);
		}).catch(function() {
			console.error('you should not see this');
		});
	};
});

var proposalCreateUrl = require('./tmpl/proposal-create.html');
// var proposalListUrl = require('./tmpl/proposal-list.html');
// var proposalDetailUrl = require('./tmpl/proposal-detail.html');
// var proposalUpdateUrl = require('./tmpl/proposal-update.html');

app.component('lgProposalCreateRoute', {
	templateUrl: proposalCreateUrl,
	controller: 'ProposalCreateCtrl',
});

// app.component('lgProposalListRoute', {
//     templateUrl: proposalListUrl,
//     controller: 'ProposalListCtrl',
// });

// app.component('lgProposalRetrieveRoute', {
//     templateUrl: proposalDetailUrl,
//     controller: 'ProposalCtrl',
// });

// app.component('lgProposalUpdateRoute', {
//     templateUrl: proposalUpdateUrl,
//     controller: 'ProposalUpdateCtrl',
// });
