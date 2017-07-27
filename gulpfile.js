const gulp = require('gulp');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const del = require('del');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const fs = require('fs');
const rp = require('request-promise');
const consolidate = require('consolidate');
const ejs = require('ejs');
consolidate.requires.ejs = ejs;
const gutil = require('gulp-util');
const ftp = require('gulp-ftp');
const zip = require('gulp-zip');
const glob = require('glob');

const Promise = require('bluebird');
Promise.promisifyAll(fs);
const globAsync = Promise.promisify(glob);

const cfgUtils = require('./cfg/utils.js');
require('./gulp/eslint.js')(gulp);


gulp.task('default', ['rebuild']);

const path = {
	base: 'app',
	dist: 'dist',
	zipSrc: ['dist/**/*', 'dist/.htaccess', 'dist/ws/.htaccess', '!dist/**/*.map'],
	zip: 'dist.zip',
	wpk: 'app/wpk',
	installHtml: ['app/install/index.html'],
	indexHtml: 'app/index.html',
	htaccess: ['app/.htaccess.tmpl'],
	htaccessWs: ['app/ws/.htaccess'],
	resources: ['app/img/**/*', 'app/json/**/*', 'app/wpk/**/*', 'app/ws/**/*',
		'!app/ws/**/*.log', '!app/ws/**/*.ini', '!app/ws/**/*.tmpl',
		'!app/img/**/*.svg', 'app/*.html', '!app/index.html'
	],
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
	return gulp.src(path.resources, { base: path.base })
		.pipe(gulp.dest(path.dist));
});

gulp.task('htaccess', ['htaccess:app', 'htaccess:ws']);

gulp.task('htaccess:app', function() {
	return gulp.src(path.htaccess, { base: path.base })
		.pipe(rename('.htaccess'))
		.pipe(gulp.dest(path.dist));
});

gulp.task('htaccess:ws', function() {
	return gulp.src(path.htaccessWs, { base: path.base })
		.pipe(gulp.dest(path.dist));
});

gulp.task('html:install', function() {
	return gulp.src(path.installHtml, { base: path.base })
		.pipe(gulp.dest(path.dist));
});

gulp.task('html:index', function() {
	return gulp.src(path.indexHtml, { base: path.base })
		.pipe(replace(/\/app\//, '/dist/'))
		.pipe(gulp.dest(path.dist));
});

gulp.task('html', ['html:install', 'html:index']);

gulp.task('webpack', function(callback) {
	webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false,
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

gulp.task('build', function() {
	console.log('gulp build');
	runSequence('webpack', ['resources', 'html', 'htaccess']);
});

gulp.task('rebuild', function() {
	runSequence('clean', 'build');
});

gulp.task('deploy:config', function(callback) {
	const deployEnv = cfgUtils.getEnv('deploy');
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
	const deployEnv = cfgUtils.getEnv('deploy');
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
	return gulp.src(path.zipSrc, { base: 'dist' })
		.pipe(zip(path.zip))
		.pipe(gulp.dest('.'));
});

gulp.task('deploy:ftp', function() {
	const deployEnv = cfgUtils.getEnv('deploy');
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
	const deployEnv = cfgUtils.getEnv('deploy');
	console.log('env.ftp', deployEnv.ftp);
	return gulp.src(path.undeploy)
		.pipe(ftp(deployEnv.ftp))
		.pipe(gutil.noop());
});

gulp.task('undeploy:remove', function(callback) {
	const deployEnv = cfgUtils.getEnv('deploy');
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
	const devEnv = cfgUtils.getEnv('dev');
	let svg;
	globAsync('app/img/**/*.svg').then(function(files) {
		svg = { svgs: files.map((f) => f.replace(/^app/, '')) };
		return consolidate.ejs('./cfg/config.ws.tmpl', devEnv.ws);
	}).then(function(str) {
		return fs.writeFileAsync('./app/ws/include/suggested.config.php', str);
	}).then(function() {
		console.log('./app/ws/include/suggested.config.php saved.');
		return consolidate.ejs('./cfg/svg.tmpl', svg);
	}).then(function(str) {
		return fs.writeFileAsync('./app/modules/technic/lg-widget/tmpl/lg-image.html', str);
	}).then(function() {
		console.log('./app/modules/technic/lg-widget/tmpl/lg-image.html saved.');
		callback();
	}).catch(function(error) {
		console.error('error', error);
	});

});
