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
    $urlRouterProvider.otherwise('/');
}

import adminNavHtml from './tmpl/admin-nav.html';
import adminHtml from './tmpl/admin.html';
import * as ctrlLib from './ctrl/admin-ctrl.js';

export const adminNavRoute = {
	template: adminNavHtml,
	controller: ctrlLib.AdminCtrl,
};

export const adminRoute =  {
    template: adminHtml,
    controller: ctrlLib.AdminCtrl,
};

