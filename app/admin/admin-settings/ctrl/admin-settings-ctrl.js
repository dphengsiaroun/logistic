export function AdminSettingsCtrl($window, $stateParams, adminSettings) {
	'ngInject';
	this.adminSettings = adminSettings;

	this.logLevels = ['Debug', 'Warning', 'Error'];

	adminSettings.logLevel.get().then(logLevel => {
		console.log('logLevel', logLevel);
		this.logLevel = logLevel.level;
		this.previousLogLevel = logLevel.level;
	});


	this.previousLogLevel = 'Warning';
	this.logLevel = 'Warning';

	adminSettings.logFile.list().then((logs) => {
		this.logs = logs;
	});

	this.confirm = (...args) => {
		console.log('confirm', args, this.logLevel);
		const answer = $window.confirm('Vous êtes sûr ?');
		console.log('answer', answer);
		if (answer) {
			this.previousLogLevel = this.logLevel;
			adminSettings.logLevel.update(this.logLevel);
		} else {
			this.logLevel = this.previousLogLevel;
		}
	};
}
