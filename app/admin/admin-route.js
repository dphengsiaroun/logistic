export function config($locationProvider, $stateProvider, $urlRouterProvider, lgConfigProvider) {
    'ngInject';

    lgConfigProvider.wsDir('../ws/');

    $locationProvider.html5Mode(true);
    $stateProvider.state({
        name: 'admin',
        url: '/',
        component: 'adminRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:login',
        url: '/signin',
        component: 'adminLoginRoute',
    });
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
    $stateProvider.state({
		name: 'admin:signout',
		url: '/signout',
		component: 'adminPrompt',
		resolve: {
			service: function($state, adminConnection) {
                'ngInject';
				return {
					questionMsg: 'Voulez vous vraiment vous déconnecter&nbsp;?',
					doNo: function() {
						$state.go('admin');
					},
					doYes: adminConnection.delete
				};
			}
		},
		needsUser: true
	});
    $urlRouterProvider.otherwise('/');
}

import adminNavHtml from './tmpl/admin-nav.html';
import adminHtml from './tmpl/admin.html';
import adminUsersHtml from './tmpl/admin-users.html';
import adminLoginHtml from './tmpl/admin-login.html';
import adminLoadersHtml from './tmpl/admin-loaders.html';
import adminCarriersHtml from './tmpl/admin-carriers.html';
import adminProposalsHtml from './tmpl/admin-proposals.html';
import * as ctrlLib from './ctrl/admin-ctrl.js';

export const adminNavRoute = {
	template: adminNavHtml,
	controller: ctrlLib.AdminCtrl,
};

export const adminRoute =  {
    template: adminHtml,
    controller: ctrlLib.AdminCtrl,
};

export const adminLoginRoute =  {
    template: adminLoginHtml,
    controller: ctrlLib.AdminConnectionCtrl,
};

export const adminUsersRoute =  {
    template: adminUsersHtml,
    controller: ctrlLib.AdminUsersCtrl,
};

export const adminLoadersRoute =  {
    template: adminLoadersHtml,
    controller: ctrlLib.AdminLoadersCtrl,
};

export const adminCarriersRoute =  {
    template: adminCarriersHtml,
    controller: ctrlLib.AdminCarriersCtrl,
};

export const adminProposalsRoute =  {
    template: adminProposalsHtml,
    controller: ctrlLib.AdminProposalsCtrl,
};
