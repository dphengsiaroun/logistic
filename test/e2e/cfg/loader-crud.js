const {config} = require('../../../protractor.conf.js');
config.specs = [
	'../e2e-install.js',
	'../e2e-geoloc-stub.js',
	'../e2e-loader.js',
];
exports.config = config;
