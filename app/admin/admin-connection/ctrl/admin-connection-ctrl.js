export function AdminConnectionCtrl($stateParams, adminConnection, adminUser) {
	'ngInject';
	const ctrl = this;
	ctrl.adminConnection = adminConnection;
	ctrl.adminUser = adminUser;
	console.log('ctrl.adminConnection', ctrl.adminConnection);
	console.log('ctrl.adminUser', ctrl.adminUser);
}