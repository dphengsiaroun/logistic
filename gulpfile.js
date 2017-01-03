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
var yargs = require('yargs');
var rp = require('request-promise');

var config;
try {
	config = require('./config.deploy.js.tmpl');

} catch(e) {
	console.log('no config.deploy.js.tmpl');
}


gulp.task('default', ['rebuild']);

var path = {
	base: 'app',
	dist: 'dist',
	zip: 'dist.zip',
	deploy: 'app/deploy/deploy.php',
	html: ['app/index.html', 'app/install/index.html'],
	resources: ['app/img/**/*', 'app/wpk/**/*', 'app/ws/**/*', '!app/ws/**/*.log', '!app/ws/**/*.ini', '!app/ws/**/*.tmpl']
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

function doZip(name, callback) {

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
	archive.glob('**/*', {ignore: '**/*.map', cwd: 'dist'});
	archive.append(fs.createReadStream('config.ws.' + name + '.ini.tmpl'), { name: 'ws/include/config.ini.tmpl' });
	archive.finalize();
}

function doFtp(options, callback) {
	var ftp = new Ftp();
	ftp.on('ready', function() {
		remoteDir = options.remoteDir;
		console.log('remoteDir', remoteDir);
		ftp.put(path.zip, remoteDir + '/dist.zip', function(err) {
			if (err) {
				throw err;
			}
			ftp.put(path.deploy, remoteDir + '/deploy.php', function(err) {
				if (err) {
					throw err;
				}
				ftp.end();
				callback();
			});
		});

	});
	console.log('options', options);
	ftp.connect(options);
}

function doUnzip(options) {
	rp(options.url + 'deploy.php')
		.then(function(htmlString) {
			console.log('htmlString', htmlString);
		})
		.catch(function(err) {
			console.log('error', err);
			throw err;
		});
}

gulp.task('deploy', ['clean:zip'], function(callback) {
	var argv = yargs.argv;
	console.log('argv', argv);
	var name = 'kiki';
	var options;
	if ('target' in argv) {
		name = argv.target;
	} else {
		throw new Error('No target specified. Command example: gulp deploy --target=my_target');
	}
	if (config && config[name]) {
		options = config[name];
	}

	// Zip the dist directory
	doZip(name, function() {
		doFtp(options, function() {
			doUnzip(options);
		});
	});
	// FTP the zip on the target

	// FTP the PHP unzipper script
	callback();
});
