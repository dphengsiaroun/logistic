// Karma configuration
// Generated on Thu Jul 06 2017 16:23:43 GMT+0200 (CEST)

const webpackKarmaConfig = require('./webpack.karma.config.js');

module.exports = function(config) {
	config.set({

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],


		// list of files / patterns to load in the browser
		files: [
			'test/unit/index.js',
		],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'test/unit/index.js': ['webpack'],
		},

		webpack: webpackKarmaConfig,
		webpackMiddleware: {
			noInfo: 'errors-only'
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'coverage'],

		coverageReporter: {
			reporters: [{
				type: 'json',
				dir: 'coverage/json',
				subdir: '.'
			}]
		},

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN 
		// || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_WARN,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		client: {
			// log console output in our test console (false: no log)
			captureConsole: false
		},
	});
};
