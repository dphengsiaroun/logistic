export function config($stateProvider) {
    'ngInject';
    $stateProvider.state({
        name: 'admin:login',
        url: '/signin',
        component: 'adminLoginRoute',
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
}

import adminLoginHtml from './tmpl/admin-login.html';
import * as ctrlLib from './ctrl/admin-connection-ctrl.js';

export const adminLoginRoute =  {
    template: adminLoginHtml,
    controller: ctrlLib.AdminConnectionCtrl,
};
