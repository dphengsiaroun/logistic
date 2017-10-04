export function config($stateProvider) {
    'ngInject';
    $stateProvider.state({
        name: 'admin',
        url: '/admin',
        component: 'lgAdminRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:users',
        url: '/admin/users',
        component: 'lgAdminUsersRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:loaders',
        url: '/admin/loaders',
        component: 'lgAdminLoadersRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:carriers',
        url: '/admin/carriers',
        component: 'lgAdminCarriersRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:trucks',
        url: '/admin/trucks',
        component: 'lgAdminTrucksRoute',
        needsUser: true
    });
    $stateProvider.state({
        name: 'admin:proposals',
        url: '/admin/proposals',
        component: 'lgAdminProposalsRoute',
        needsUser: true
    });
}

import adminNavHtml from './tmpl/lg-admin-nav.html';
import adminHtml from './tmpl/lg-admin.html';
import adminUsersHtml from './tmpl/lg-admin-users.html';
import adminLoadersHtml from './tmpl/lg-admin-loaders.html';
import adminCarriersHtml from './tmpl/lg-admin-carriers.html';
import adminTrucksHtml from './tmpl/lg-admin-trucks.html';
import adminProposalsHtml from './tmpl/lg-admin-proposals.html';
import * as ctrlLib from './ctrl/lg-admin-ctrl.js';

export const lgAdminNavRoute = {
	template: adminNavHtml,
	controller: ctrlLib.AdminCtrl,
};

export const lgAdminRoute =  {
    template: adminHtml,
    controller: ctrlLib.AdminCtrl,
};

export const lgAdminUsersRoute =  {
    template: adminUsersHtml,
    controller: ctrlLib.AdminUsersCtrl,
};

export const lgAdminLoadersRoute =  {
    template: adminLoadersHtml,
    controller: ctrlLib.AdminLoadersCtrl,
};

export const lgAdminCarriersRoute =  {
    template: adminCarriersHtml,
    controller: ctrlLib.AdminCarriersCtrl,
};

export const lgAdminTrucksRoute =  {
    template: adminTrucksHtml,
    controller: ctrlLib.AdminTrucksCtrl,
};

export const lgAdminProposalsRoute =  {
    template: adminProposalsHtml,
    controller: ctrlLib.AdminProposalsCtrl,
};
