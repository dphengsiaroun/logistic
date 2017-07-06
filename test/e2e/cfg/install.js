const {config} = require('../../../protractor.conf.js');
config.specs = [
	'../e2e-install.js',
];
exports.config = config;
