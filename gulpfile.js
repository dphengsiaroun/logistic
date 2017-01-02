var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var del = require('del');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
//webpackConfig.setupProd();
var eslint = require('gulp-eslint');


gulp.task('default', ['rebuild']);

var path = {
	base: 'app',
	dist: 'dist',
	html: ['app/index.html', 'app/install/index.html'],
	webpack: ['app/app.js'],
	resources: ['app/img/**/*', 'app/wpk/**/*']
};


// Delete the dist directory
gulp.task('clean', function() {
	return del(path.dist);
});

gulp.task('resources', function() {
	return gulp.src(path.resources, {base: path.base})
		.pipe(gulp.dest(path.dist));
});

gulp.task('html', function() {
	return gulp.src(path.html, {base: path.base})
		.pipe(gulp.dest(path.dist));
});

gulp.task('webpack', function(callback) {
    webpack(webpackConfig, function(err, stats) {
        if (err) {
			throw new gutil.PluginError('webpack', err);
		}
        callback();
    });
});

gulp.task('build', function() {
	console.log('gulp build');
	runSequence('webpack', ['resources', 'html']);
});

gulp.task('rebuild', function() {
	runSequence('clean', 'build');
});

gulp.task('lint', function() {
	return gulp.src(['**/*.js'])
	.pipe(eslint())
	.pipe(eslint.formatEach())
	.pipe(eslint.failAfterError());
});
