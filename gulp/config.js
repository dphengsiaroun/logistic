const glob = require('glob');
const consolidate = require('consolidate');
const ejs = require('ejs');
consolidate.requires.ejs = ejs;
const fs = require('fs');
const Promise = require('bluebird');
Promise.promisifyAll(fs);
const globAsync = Promise.promisify(glob);

const cfgUtils = require('../cfg/utils.js');

module.exports = function(gulp, pathConfig) {
	gulp.task('config', function(callback) {
		const devEnv = cfgUtils.getEnv('dev');
		let svg;
		globAsync('app/img/**/*.svg').then(function(files) {
			svg = { svgs: files.map((f) => f.replace(/^app/, '')) };
			return consolidate.ejs('./cfg/config.ws.tmpl', devEnv.ws);
		}).then(function(str) {
			return fs.writeFileAsync('./app/ws/include/suggested.config.php', str);
		}).then(function() {
			
			return consolidate.ejs('./cfg/svg.tmpl', svg);
		}).then(function(str) {
			return fs.writeFileAsync('./app/modules/technic/lg-img-svg/tmpl/lg-image.html', str);
		}).then(function() {
			
			callback();
		}).catch(function(error) {
			console.error('error', error);
		});
	});
};
