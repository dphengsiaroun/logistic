const runSequence = require('run-sequence');
const zip = require('gulp-zip');
const consolidate = require('consolidate');
const fs = require('fs');
const Promise = require('bluebird');
Promise.promisifyAll(fs);
const rp = require('request-promise');
const gutil = require('gulp-util');
const ftp = require('gulp-ftp');

const cfgUtils = require('../cfg/utils.js');

module.exports = function(gulp, pathConfig) {

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
		return gulp.src(pathConfig.zipSrc, { base: 'dist' })
			.pipe(zip(pathConfig.zip))
			.pipe(gulp.dest('.'));
	});

	gulp.task('deploy:ftp', function() {
		const deployEnv = cfgUtils.getEnv('deploy');
		console.log('env', deployEnv);
		console.log('env.ftp', deployEnv.ftp);
		return gulp.src(pathConfig.ftp)
			.pipe(ftp(deployEnv.ftp))
			.pipe(gutil.noop());
	});

	gulp.task('deploy', ['clean:zip'], function() {
		runSequence('deploy:config', 'deploy:zip', 'deploy:ftp', 'deploy:unzip');
	});
};
