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
        name: 'admin:terms',
        url: '/terms',
        component: 'adminTermsRoute',
        needsUser: true
    });
    $urlRouterProvider.otherwise('/');
}

import adminNavHtml from './tmpl/admin-nav.html';
import adminFooterHtml from './tmpl/admin-footer.html';
import adminHtml from './tmpl/admin.html';
import adminTermsHtml from './tmpl/terms.html';
import * as ctrlLib from './ctrl/admin-ctrl.js';

export const adminNavRoute = {
	template: adminNavHtml,
	controller: ctrlLib.AdminCtrl,
};

export const adminFooterRoute = {
	template: adminFooterHtml,
};

export const adminRoute =  {
    template: adminHtml,
    controller: ctrlLib.AdminCtrl,
};

export const adminTermsRoute =  {
    template: adminTermsHtml,
    controller: ctrlLib.AdminCtrl,
};

