module.exports = function(gulp) {
	gulp.task('import:data', function(cb) {
		require('./sql/db-import.js');
		cb();
	});
	gulp.task('insert-sql');
};
