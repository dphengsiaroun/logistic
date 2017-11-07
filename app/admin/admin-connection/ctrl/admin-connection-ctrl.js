export function AdminConnectionCtrl($stateParams, $window, adminConnection, adminUser) {
	'ngInject';
	const ctrl = this;
	ctrl.adminConnection = adminConnection;
	ctrl.adminUser = adminUser;
	console.log('ctrl.adminConnection', ctrl.adminConnection);
}