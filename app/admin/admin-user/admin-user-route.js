export function config($stateProvider) {
    'ngInject';
    $stateProvider.state({
        name: 'admin:users',
        url: '/users',
        component: 'adminUsersRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:user:delete',
        url: '/user/{id}/delete',
        component: 'adminConfirm',
        resolve: {
            service: function($state, adminUser, $stateParams) {
                'ngInject';
                const result = {};
                result.doCancel = function() {
                    $state.go('admin:users');
                };
                result.doConfirm = function() {
                    adminUser.delete($stateParams.id).catch(function(error) {
                        result.error = error;
                    });
                };
                result.confirmationMsg = 'Voulez-vous vraiment supprimer cette utilisateur&nbsp;?';
                result.cancelMsg = 'Non, annuler';
                result.confirmMsg = 'Oui, supprimer';
                return result;
            }
        }
    });
}

import adminUsersHtml from './tmpl/admin-users.html';
import * as ctrlLib from './ctrl/admin-user-ctrl.js';

export const adminUsersRoute =  {
    template: adminUsersHtml,
    controller: ctrlLib.AdminUsersCtrl,
};

