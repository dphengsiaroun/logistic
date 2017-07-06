const cfg = require('../../../protractor.conf.js');
console.log('cfg', cfg);
const config = cfg.config;
config.specs = [
	'../e2e-install.js',
];
exports.config = config;
