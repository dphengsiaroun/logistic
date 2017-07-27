const eslint = require('gulp-eslint');
const gulpIf = require('gulp-if');
const debug = require('gulp-debug');
const path = {
	lint: ['**/*.js', '!node_modules/**/*', '!app/ws/**/*', '!**/*.min.js', '!**/*.prod.js',
		'!app/wpk/**/*', '!dist/**/*'
	]
};

module.exports = function(gulp) {
	gulp.task('eslint', function() {
		return gulp.src(path.lint)
			.pipe(debug())
			.pipe(eslint())
			.pipe(eslint.formatEach())
			.pipe(eslint.failAfterError());
	});

	function isFixed(file) {
		return file.eslint != null && file.eslint.fixed;
	}

	gulp.task('eslint-fix', function() {
		return gulp.src(path.lint)
			.pipe(eslint({
				fix: true
			}))
			.pipe(eslint.formatEach())
			.pipe(gulpIf(isFixed, gulp.dest('.')));
	});
};
