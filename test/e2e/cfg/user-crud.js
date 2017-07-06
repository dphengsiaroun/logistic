const {config} = require('../../../protractor.conf.js');
config.specs = [
	'../e2e-install.js',
	// '../e2e-user.js',
];
exports.config = config;
