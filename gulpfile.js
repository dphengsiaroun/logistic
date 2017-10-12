const gulp = require('gulp');

const pathConfig = {
	base: 'app',
	dist: 'dist',
	zipSrc: ['dist/**/*', 'dist/.htaccess', 'dist/ws/.htaccess', '!dist/**/*.map'],
	zip: 'dist.zip',
	wpk: 'app/wpk',
	coverage: './coverage',
	installHtml: ['app/install/index.html'],
	adminHtml: ['app/admin/index.html'],
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

require('./gulp/eslint.js')(gulp);
require('./gulp/config.js')(gulp, pathConfig);
require('./gulp/clean.js')(gulp, pathConfig);
require('./gulp/build.js')(gulp, pathConfig);
require('./gulp/deploy.js')(gulp, pathConfig);
require('./gulp/undeploy.js')(gulp, pathConfig);

gulp.task('default', ['rebuild']);


