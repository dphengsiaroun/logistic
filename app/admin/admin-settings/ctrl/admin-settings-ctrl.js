export function AdminSettingsCtrl($stateParams, adminSettings) {
	'ngInject';
	this.adminSettings = adminSettings;

	adminSettings.list().then((logs) => {
		this.logs = logs;
	});
}