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
var Ftp = require('ftp');
var ftpObj = {};
var remoteZip = '';
try {
	var config = require('./config.js');
	ftpObj = config.ftp;
	remoteZip = config.remoteZip;
} catch(e) {
	console.log('no config.js');
}


gulp.task('default', ['rebuild']);

var path = {
	base: 'app',
	dist: 'dist',
	zip: 'dist.zip',
	html: ['app/index.html', 'app/install/index.html'],
	resources: ['app/img/**/*', 'app/wpk/**/*', 'app/ws/**/*', '!app/ws/**/*.log', '!app/ws/**/*.ini']
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

function doZip(callback) {

	var output = fs.createWriteStream(__dirname + '/dist.zip');
	var archive = archiver('zip');

	output.on('close', function() {
		console.log(archive.pointer() + ' total bytes');
		console.log('archiver has been finalized and the output file descriptor has closed.');
		callback();
	});

	archive.on('error', function(err) {
		throw err;
	});

	archive.pipe(output);
	archive.glob('**/*', {ignore: '**/*.map', cwd: './dist'});
	// archive.directory('dist/');
	archive.finalize();
}

function doFtp() {
	var ftp = new Ftp();
	ftp.on('ready', function() {
		console.log('remoteZip', remoteZip);
		ftp.put(path.zip, remoteZip, function(err) {
			if (err) {
				throw err;
			}
			ftp.end();
		});
	});
	console.log('ftpObj', ftpObj);
	ftp.connect(ftpObj);
}

gulp.task('deploy', ['clean:zip'], function(callback) {
	// Zip the dist directory
	doZip(function() {
		doFtp();
	});
	// FTP the zip on the target

	// FTP the PHP unzipper script
	callback();
});
