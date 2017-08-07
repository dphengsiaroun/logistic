const {config} = require('../../../protractor.conf.js');
config.specs = [
	'../e2e-install.js',
	'../e2e-init.js',
	'../e2e-password.js',
];
exports.config = config;
