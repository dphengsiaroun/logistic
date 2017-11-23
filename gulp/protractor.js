const protractor = require('gulp-protractor').protractor;
const path = {
	e2e: ['./test/e2e/gulp/*.js']
};

module.exports = function(gulp) {
	gulp.task('protractor', function() {
		return gulp.src(path.e2e)
			.pipe(protractor({
				configFile: 'protractor.conf.js',
				args: []
			}))
			.on('error', function(e) { throw e; });
	});
};
