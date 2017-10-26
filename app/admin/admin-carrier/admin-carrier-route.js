export function config($stateProvider) {
    'ngInject';
    $stateProvider.state({
        name: 'admin:carriers',
        url: '/carriers',
        component: 'adminCarriersRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:carrier:delete',
        url: '/carrier/{id}/delete',
        component: 'adminConfirm',
        resolve: {
            service: function($state, adminCarrier, $stateParams) {
                'ngInject';
                const result = {};
                result.doCancel = function() {
                    $state.go('admin:carriers');
                };
                result.doConfirm = function() {
                    adminCarrier.delete($stateParams.id).catch(function(error) {
                        result.error = error;
                    });
                };
                result.confirmationMsg = 'Voulez-vous vraiment supprimer cette annonce de transport&nbsp;?';
                result.cancelMsg = 'Non, annuler';
                result.confirmMsg = 'Oui, supprimer';
                return result;
            }
        }
    });
}

import adminCarriersHtml from './tmpl/admin-carriers.html';
import * as ctrlLib from './ctrl/admin-carrier-ctrl.js';

export const adminCarriersRoute =  {
    template: adminCarriersHtml,
    controller: ctrlLib.AdminCarriersCtrl,
};

