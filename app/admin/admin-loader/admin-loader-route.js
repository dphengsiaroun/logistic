export function config($stateProvider) {
    'ngInject';
    $stateProvider.state({
        name: 'admin:loaders',
        url: '/loaders',
        component: 'adminLoadersRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:loader:delete',
        url: '/loader/{id}/delete',
        component: 'adminConfirm',
        resolve: {
            service: function($state, adminLoader, $stateParams) {
                'ngInject';
                const result = {};
                result.doCancel = function() {
                    $state.go('admin:loaders');
                };
                result.doConfirm = function() {
                    adminLoader.delete($stateParams.id).catch(function(error) {
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
}

import adminLoadersHtml from './tmpl/admin-loaders.html';
import * as ctrlLib from './ctrl/admin-loader-ctrl.js';

export const adminLoadersRoute =  {
    template: adminLoadersHtml,
    controller: ctrlLib.AdminLoadersCtrl,
};

