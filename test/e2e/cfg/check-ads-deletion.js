const {config} = require('../../../protractor.conf.js');
config.specs = [
	'../e2e-install.js',
	'../e2e-init.js',
	'../e2e-check-ads-deletion.js',
];
exports.config = config;
