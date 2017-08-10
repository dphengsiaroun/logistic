module.exports = {
	extends: ['google', 'eslint:recommended', 'plugin:angular/johnpapa'],
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
	},
	rules: {
		'no-var': 'error',
		'prefer-const': 'error',
		'no-console': 0,
		'prefer-rest-params': 0,
		'max-len': ['error', 120],
		'comma-dangle': 0,
		'require-jsdoc': 0,
		'padded-blocks': 0,
		'prefer-spread': 0,
		'no-use-before-define': 'error',
		'no-undef-init': 'error',
		'semi': ['error', 'always'],
		'quotes': ['error', 'single'],
		'eqeqeq': ['error', 'always'],
		'max-lines': ["error", {max: 200, skipBlankLines: false}]
	},
	env: {
		browser: true,
		node: true,
		jasmine: true,
	},
	globals: {
		jQuery: true,
		$: true,
		angular: true,
		inject: true,
		browser: true,
		element: true,
		by: true,
		getJSONFixture: true,
		FastClick: true,
		io: true,
		Promise: true,
	}
};
