export function config($stateProvider) {
    'ngInject';
    $stateProvider.state({
        name: 'admin:settings',
        url: '/settings',
        component: 'adminSettingsRoute',
        needsUser: true
    });
}

import adminSettingsHtml from './tmpl/admin-settings.html';
import * as ctrlLib from './ctrl/admin-settings-ctrl.js';

export const adminSettingsRoute =  {
    template: adminSettingsHtml,
    controller: ctrlLib.AdminSettingsCtrl,
};

