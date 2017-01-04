var gulp = require('gulp');
var gulpIf = require('gulp-if');
var runSequence = require('run-sequence');
var del = require('del');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
webpackConfig.setupProd();
var eslint = require('gulp-eslint');
var fs = require('fs');
var archiver = require('archiver');
var rp = require('request-promise');
var consolidate = require('consolidate');
var ejs = require('ejs');
consolidate.requires.ejs = ejs;
var gutil = require('gulp-util');
var ftp = require('gulp-ftp');
var zip = require('gulp-zip');

var Promise = require('bluebird');
Promise.promisifyAll(fs);

var cfgUtils = require('./cfg/utils.js');
var devEnv = cfgUtils.getEnv('dev');
var deployEnv = cfgUtils.getEnv('deploy');



gulp.task('default', ['rebuild']);

var path = {
	base: 'app',
	dist: 'dist',
	zipSrc: ['dist/**/*', '!dist/**/*.map'],
	zip: 'dist.zip',
	html: ['app/index.html', 'app/install/index.html'],
	resources: ['app/img/**/*', 'app/wpk/**/*', 'app/ws/**/*', '!app/ws/**/*.log', '!app/ws/**/*.ini', '!app/ws/**/*.tmpl'],
	ftp: ['dist.zip', 'utils/unzip.php'],
};


// Delete the dist directory
gulp.task('clean:dist', function() {
	return del([path.dist]);
});

gulp.task('clean:zip', function() {
	return del([path.zip]);
});

gulp.task('clean', ['clean:dist', 'clean:zip']);

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

function isFixed(file) {
	return file.eslint != null && file.eslint.fixed;
}

gulp.task('lint-fix', function() {
	return gulp.src(['**/*.js'])
	.pipe(eslint({
		fix: true
	}))
	.pipe(eslint.formatEach())
	.pipe(gulpIf(isFixed, gulp.dest('.')));
});

gulp.task('deploy:config', function(callback) {
	consolidate.ejs('./cfg/config.ws.tmpl', deployEnv.ws).then(function(str) {
		return fs.writeFileAsync('./dist/ws/include/suggested.config.php', str);
	}).then(function(str) {
		console.log('./dist/ws/include/suggested.config.php saved.');
		callback();
	}).catch(function(error) {
		console.error('error', error);
	});
});

gulp.task('deploy:unzip', function(callback) {
	rp(deployEnv.unzip.url + 'unzip.php')
		.then(function(htmlString) {
			console.log('htmlString', htmlString);
			callback();
		})
		.catch(function(err) {
			console.log('error', err);
			throw err;
		});
});

gulp.task('deploy:zip', function(callback) {
	return gulp.src(path.zipSrc, {base: 'dist'})
        .pipe(zip(path.zip))
        .pipe(gulp.dest('.'));
});

gulp.task('deploy:ftp', function() {
	console.log('env', deployEnv);
	console.log('env.ftp', deployEnv.ftp);
	return gulp.src(path.ftp)
		.pipe(ftp(deployEnv.ftp))
		.pipe(gutil.noop());
});

gulp.task('deploy', ['clean:zip'], function() {
	runSequence('deploy:config', 'deploy:zip', 'deploy:ftp', 'deploy:unzip');
});

gulp.task('config', function(callback) {
	consolidate.ejs('./cfg/config.ws.tmpl', devEnv.ws).then(function(str) {
		return fs.writeFileAsync('./app/ws/include/suggested.config.php', str);
	}).then(function(str) {
		console.log('./app/ws/include/suggested.config.php saved.');
		callback();
	}).catch(function(error) {
		console.error('error', error);
	});
});


