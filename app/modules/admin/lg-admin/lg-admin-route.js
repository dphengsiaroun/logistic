export function config($stateProvider) {
    'ngInject';
    $stateProvider.state({
        name: 'admin',
        url: '/admin',
        component: 'lgAdminRoute',
        needsUser: true
    });

}

import adminCreateHtml from './tmpl/lg-admin.html';
import * as ctrlLib from './ctrl/lg-admin-ctrl.js';

export const lgAdminRoute =  {
    template: adminCreateHtml,
    controller: ctrlLib.TruckCreateCtrl,
};
