const replace = require('gulp-replace');
const rename = require('gulp-rename');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const runSequence = require('run-sequence');
const gutil = require('gulp-util');


module.exports = function(gulp, pathConfig) {
	gulp.task('build:webpack', function(callback) {
		webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: true
			},
			output: {
				comments: false,
			},
			sourceMap: true
		}));
		webpack(webpackConfig, function(err, stats) {
			if (err) {
				throw new gutil.PluginError('webpack', err);
			}
			callback();
		});
	});

	gulp.task('build:resources', function() {
		return gulp.src(pathConfig.resources, { base: pathConfig.base })
			.pipe(gulp.dest(pathConfig.dist));
	});

	gulp.task('build:html:install', function() {
		return gulp.src(pathConfig.installHtml, { base: pathConfig.base })
			.pipe(gulp.dest(pathConfig.dist));
	});

	gulp.task('build:html:index', function() {
		return gulp.src(pathConfig.indexHtml, { base: pathConfig.base })
			.pipe(replace(/\/app\//, '/dist/'))
			.pipe(gulp.dest(pathConfig.dist));
	});

	gulp.task('build:html:admin', function() {
		return gulp.src(pathConfig.adminHtml, { base: pathConfig.base })
			.pipe(replace(/\/app\//, '/dist/'))
			.pipe(gulp.dest(pathConfig.dist));
	});

	gulp.task('build:html', ['build:html:install', 'build:html:index', 'build:html:admin']);

	gulp.task('build:htaccess:app', function() {
		return gulp.src(pathConfig.htaccess, { base: pathConfig.base })
			.pipe(rename('.htaccess'))
			.pipe(gulp.dest(pathConfig.dist));
	});

	gulp.task('build:htaccess:ws', function() {
		return gulp.src(pathConfig.htaccessWs, { base: pathConfig.base })
			.pipe(gulp.dest(pathConfig.dist));
	});

	gulp.task('build:htaccess', ['build:htaccess:app', 'build:htaccess:ws']);

	gulp.task('build', function() {
		console.log('gulp build');
		runSequence('build:webpack', ['build:resources', 'build:html', 'build:htaccess']);
	});

	gulp.task('rebuild', function() {
		runSequence('clean', 'build');
	});
};
