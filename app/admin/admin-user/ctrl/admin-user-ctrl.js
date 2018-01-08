export function AdminUsersCtrl($stateParams, adminUser) {
	'ngInject';
	const ctrl = this;
	ctrl.adminUser = adminUser;

	ctrl.$onInit = function() {
		adminUser.list().then(function(list) {
			ctrl.user = list;
			console.log('ctrl.user', ctrl.user);
		}).catch(function(error) {
			console.error('error', error);
		});
	};
}