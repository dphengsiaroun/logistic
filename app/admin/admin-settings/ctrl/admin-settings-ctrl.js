export function AdminSettingsCtrl($stateParams, adminUser) {
	'ngInject';
	const ctrl = this;
	ctrl.adminUser = adminUser;
}