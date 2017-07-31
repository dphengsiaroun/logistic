const {config} = require('../../../protractor.conf.js');
config.specs = [
	'../e2e-install.js',
	'../e2e-orderby.js',
];
exports.config = config;
