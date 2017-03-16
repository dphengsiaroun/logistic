'use strict';

var app = angular.module('lg-proposal');

app.config(['$stateProvider', function($stateProvider) {

    $stateProvider.state({
        name: 'proposal:create',
        url: '/create-proposal',
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

app.controller('ProposalListCtrl', ['$scope', '$injector', function ProposalCtrl($scope, $injector) {
    this.proposal = $injector.get('proposal');
    this.user = $injector.get('user');
    this.$onInit = function() {
        this.proposal.list();
    };
}]);

app.controller('ProposalCtrl', function ProposalCtrl($stateParams, proposal, user) {
    'ngInject';
    var ctrl = this;
    ctrl.proposal = proposal;
    ctrl.user = user;
    ctrl.$onInit = function() {
        ctrl.proposal.get($stateParams.id);
    };
});

app.controller('ProposalCreateCtrl', function ProposalCtrl($scope, $injector) {
    'ngInject';
    this.proposal = $injector.get('proposal');
    this.user = $injector.get('user');
});

app.controller('ProposalUpdateCtrl', function ProposalUpdateCtrl($scope, $injector, $stateParams, proposal, user) {
    'ngInject';
    var ctrl = this;
    ctrl.proposal = proposal;
    ctrl.user = user;

    ctrl.$onInit = function() {
        ctrl.proposal.get($stateParams.id).then(function() {
            return ctrl.user.waitForCheckConnection('ProposalUpdateCtrl');
        }).then(function() {
            ctrl.proposal.updateData = angular.copy(ctrl.proposal.current);
            ctrl.proposal.updateData.oldId = $stateParams.id;
            console.log('ctrl.proposal.updateData', ctrl.proposal.updateData);
        }).catch(function() {
            console.error('you should not see this');
        });
    };
});

var proposalCreateUrl = require('./tmpl/proposal-create.html');


app.component('lgProposalCreateRoute', {
    templateUrl: proposalCreateUrl,
    controller: 'ProposalCreateCtrl',
});
