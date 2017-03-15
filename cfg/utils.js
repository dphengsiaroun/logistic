// gulp deploy --target=jlgc2
var yargs = require('yargs');

var utils = {};

utils.getEnv = function(type) {
	var env = require('./environments.js')[type];

	var target = env.default;
	if ('target' in yargs.argv) {
		target = yargs.argv.target;
	}
	if (env[target] === undefined) {
		throw new Error('Target not understood.');
	}
	env = env[target];
	env.target = target;
	return env;
};

module.exports = utils;
