export function config($stateProvider) {
    'ngInject';
    $stateProvider.state({
        name: 'admin',
        url: '/admin',
        component: 'adminRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:users',
        url: '/admin/users',
        component: 'adminUsersRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:users:update',
        url: '/admin/users/update',
        component: 'adminUsersUpdateRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:loaders',
        url: '/admin/loaders',
        component: 'adminLoadersRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:carriers',
        url: '/admin/carriers',
        component: 'adminCarriersRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:trucks',
        url: '/admin/trucks',
        component: 'adminTrucksRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:proposals',
        url: '/admin/proposals',
        component: 'adminProposalsRoute',
        needsUser: true
    });
}

import adminNavHtml from './tmpl/admin-nav.html';
import adminHtml from './tmpl/admin.html';
import adminUsersHtml from './tmpl/admin-users.html';
import adminUsersUpdateHtml from './tmpl/admin-form-update.html';
import adminLoadersHtml from './tmpl/admin-loaders.html';
import adminCarriersHtml from './tmpl/admin-carriers.html';
import adminTrucksHtml from './tmpl/admin-trucks.html';
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

export const adminUsersRoute =  {
    template: adminUsersHtml,
    controller: ctrlLib.AdminUsersCtrl,
};

export const adminUsersUpdateRoute =  {
    template: adminUsersUpdateHtml,
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

export const adminTrucksRoute =  {
    template: adminTrucksHtml,
    controller: ctrlLib.AdminTrucksCtrl,
};

export const adminProposalsRoute =  {
    template: adminProposalsHtml,
    controller: ctrlLib.AdminProposalsCtrl,
};
