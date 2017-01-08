var gulp = require('gulp');
var gulpIf = require('gulp-if');
var rename = require('gulp-rename');
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





gulp.task('default', ['rebuild']);

var path = {
	base: 'app',
	dist: 'dist',
	zipSrc: ['dist/**/*', 'dist/.htaccess', '!dist/**/*.map'],
	zip: 'dist.zip',
	wpk: 'app/wpk',
	html: ['app/index.html', 'app/install/index.html'],
	htaccess: ['app/.htaccess.tmpl'],
	resources: ['app/img/**/*',	'app/wpk/**/*', 'app/ws/**/*',
		'!app/ws/**/*.log',	'!app/ws/**/*.ini', '!app/ws/**/*.tmpl'],
	ftp: ['dist.zip', 'utils/unzip.php'],
	undeploy: 'utils/remove.php',
};


// Delete the dist directory
gulp.task('clean:dist', function() {
	return del([path.dist]);
});

gulp.task('clean:zip', function() {
	return del([path.zip]);
});

gulp.task('clean:wpk', function() {
	return del([path.wpk]);
});

gulp.task('clean', ['clean:dist', 'clean:zip', 'clean:wpk']);

gulp.task('resources', function() {
	return gulp.src(path.resources, {base: path.base})
		.pipe(gulp.dest(path.dist));
});

gulp.task('htaccess', function() {
	return gulp.src(path.htaccess, {base: path.base})
		.pipe(rename('.htaccess'))
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
	runSequence('webpack', ['resources', 'html', 'htaccess']);
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
	var deployEnv = cfgUtils.getEnv('deploy');
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
	var deployEnv = cfgUtils.getEnv('deploy');
	rp(deployEnv.url + 'unzip.php')
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
	var deployEnv = cfgUtils.getEnv('deploy');
	console.log('env', deployEnv);
	console.log('env.ftp', deployEnv.ftp);
	return gulp.src(path.ftp)
		.pipe(ftp(deployEnv.ftp))
		.pipe(gutil.noop());
});

gulp.task('deploy', ['clean:zip'], function() {
	runSequence('deploy:config', 'deploy:zip', 'deploy:ftp', 'deploy:unzip');
});

gulp.task('undeploy:ftp', function() {
	var deployEnv = cfgUtils.getEnv('deploy');
	console.log('env.ftp', deployEnv.ftp);
	return gulp.src(path.undeploy)
		.pipe(ftp(deployEnv.ftp))
		.pipe(gutil.noop());
});

gulp.task('undeploy:remove', function(callback) {
	var deployEnv = cfgUtils.getEnv('deploy');
	rp(deployEnv.url + 'remove.php')
		.then(function(htmlString) {
			console.log('htmlString', htmlString);
			callback();
		})
		.catch(function(err) {
			console.log('error', err);
			throw err;
		});
});

gulp.task('undeploy', function() {
	runSequence('undeploy:ftp', 'undeploy:remove');
});

gulp.task('config', function(callback) {
	var devEnv = cfgUtils.getEnv('dev');
	consolidate.ejs('./cfg/config.ws.tmpl', devEnv.ws).then(function(str) {
		return fs.writeFileAsync('./app/ws/include/suggested.config.php', str);
	}).then(function(str) {
		console.log('./app/ws/include/suggested.config.php saved.');
		callback();
	}).catch(function(error) {
		console.error('error', error);
	});
});


