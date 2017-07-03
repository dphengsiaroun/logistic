module.exports = function(config) {
	'use strict';

	config.set({

		basePath: '/',

		files: [
		'node_modules/angular/angular.js',
		'node_modules/angular-mocks/angular-mocks.js',
		'app/app/*.js',
		'app/test/unit/**/*.js'
		],

		autoWatch: true,

		frameworks: ['jasmine'],

		browsers: ['Chrome'],

	});
};
