const cfg = require('../../../protractor.conf.js');
console.log('cfg', cfg);
const config = cfg.config;
config.specs = [
	'../e2e-install.js',
	'../e2e-init.js',
	'../e2e-truck.js',
];
exports.config = config;
