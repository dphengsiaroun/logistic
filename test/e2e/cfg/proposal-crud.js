const {config} = require('../../../protractor.conf.js');
config.specs = [
	'../e2e-install.js',
	'../e2e-geoloc-stub.js',
	'../e2e-create-ads.js',
	'../e2e-proposal.js',
];
exports.config = config;
