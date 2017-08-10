const del = require('del');

module.exports = function(gulp, pathConfig) {
	// Delete the dist directory
	gulp.task('clean:dist', function() {
		return del([pathConfig.dist]);
	});

	gulp.task('clean:zip', function() {
		return del([pathConfig.zip]);
	});

	gulp.task('clean:wpk', function() {
		return del([pathConfig.wpk]);
	});

	gulp.task('clean', ['clean:dist', 'clean:zip', 'clean:wpk']);
};
