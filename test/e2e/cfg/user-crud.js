const cfg = require('../../../protractor.conf.js');
console.log('cfg', cfg);
const config = cfg.config;
config.specs = [
	'../e2e-install.js',
	'../e2e-user.js',
];
exports.config = config;
