export function config($stateProvider) {
    'ngInject';
    $stateProvider.state({
        name: 'admin:proposals',
        url: '/proposals',
        component: 'adminProposalsRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:proposal:remove',
        url: '/proposal/{id}/remove',
        component: 'adminConfirm',
        resolve: {
            service: function($state, adminProposal, $stateParams) {
                'ngInject';
                const result = {};
                result.doCancel = function() {
                    $state.go('admin:proposals');
                };
                result.doConfirm = function() {
                    adminProposal.delete($stateParams.id).catch(function(error) {
                        result.error = error;
                    });
                };
                result.confirmationMsg = 'Voulez-vous vraiment supprimer cette proposition&nbsp;?';
                result.cancelMsg = 'Non, annuler';
                result.confirmMsg = 'Oui, supprimer';
                return result;
            }
        }
    });
}

import adminProposalsHtml from './tmpl/admin-proposals.html';
import * as ctrlLib from './ctrl/admin-proposal-ctrl.js';

export const adminProposalsRoute =  {
    template: adminProposalsHtml,
    controller: ctrlLib.AdminProposalsCtrl,
};

