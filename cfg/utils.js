// gulp deploy --target=jlgc2
const yargs = require('yargs');

const utils = {};

utils.getEnv = function(type) {
	let env = require('./environments.js')[type];

	let target = env.default;
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
