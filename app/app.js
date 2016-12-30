'use strict';

require('../bower_components/font-awesome/css/font-awesome.css');
require('./css/segmented-controls.css');

require('./lg-menu/lg-menu.css');
require('./lg-choice/lg-choice.css');
require('./lg-calendar/lg-calendar.css');
require('./lg-calendar/lg-hour.css');
require('./lg-calendar/lg-hour2.css');
require('./lg-num/lg-num-vertical.css');
require('./lg-upload/lg-upload.css');
require('./lg-eyepassword/lg-eyepassword.css');
require('./lg-widget/lg-hr.css');
require('./lg-widget/lg-widget.css');

require('./lg-user/lg-user.css');
require('./css/create-add.css');
require('./lg-route/css/lg-home-route.css');

require('./css/style.css');

require('../bower_components/jshashes/hashes.js');
var $ = require('../bower_components/jquery/dist/jquery.js');
window.jQuery = $;
window.$ = $;
require('../bower_components/angular/angular.js');
require('../bower_components/angular-touch/angular-touch.js');
require('../bower_components/angular-i18n/angular-locale_fr-dz.js');
require('../bower_components/angular-sanitize/angular-sanitize.js');
require('../bower_components/angular-ui-router/release/angular-ui-router.js');
require('../bower_components/angular-recaptcha/release/angular-recaptcha.js');
require('../bower_components/moment/moment.js');

/* The jQuery UI widget factory, can be omitted if jQuery UI is already included */
require('imports?define=>false&exports=>false!blueimp-file-upload/js/vendor/jquery.ui.widget.js');
/* The Iframe Transport is required for browsers without support for XHR file uploads */
require('imports?define=>false&exports=>false!blueimp-file-upload/js/jquery.iframe-transport.js');
/* The basic File Upload plugin */
require('imports?define=>false&exports=>false!blueimp-file-upload/js/jquery.fileupload.js');
/* The File Upload processing plugin */
require('imports?define=>false&exports=>false!blueimp-file-upload/js/jquery.fileupload-process.js');
/* The File Upload validation plugin */
require('imports?define=>false&exports=>false!blueimp-file-upload/js/jquery.fileupload-validate.js');
/* The File Upload Angular JS module */
require('imports?define=>false&exports=>false!blueimp-file-upload/js/jquery.fileupload-angular.js');

require('./lg-misc/lg-misc.js');
require('./lg-route/lg-route.js');
require('./lg-menu/lg-menu.js');
require('./lg-svg/lg-svg.js');
require('./lg-carrier/lg-carrier.js');
require('./lg-truck/lg-truck.js');
require('./lg-loader/lg-loader.js');
require('./lg-user/lg-user.js');
require('./lg-user/lg-user-route.js');
require('./lg-choice/lg-choice.js');
require('./lg-calendar/lg-calendar.js');
require('./lg-calendar/lg-month.js');
require('./lg-calendar/lg-hour.js');
require('./lg-calendar/lg-hour2.js');
require('./lg-num/lg-num.js');
require('./lg-eyepassword/lg-eyepassword.js');
require('./lg-config/lg-config.js');
require('./lg-widget/lg-widget.js');
require('./lg-widget/lg-hr.js');
require('./lg-upload/lg-upload.js');
require('./lg-debug/lg-debug.js');
require('./lg-http/lg-http.js');
require('./lg-error/lg-error.js');
	

var app = angular.module('mainApp', [
	'ngSanitize',
	'vcRecaptcha',
	'lg-route',
	'lg-upload',
	'lg-menu',
	'lg-svg',
	'lg-user',
	'lg-carrier',
	'lg-loader',
	'lg-truck',
	'lg-choice',
	'lg-calendar',
	'lg-eyepassword',
	'lg-config',
	'lg-widget',
	'lg-debug',
	'lg-http',
	'lg-error',
	'lg-misc',
	'lg-num'
	]);

// permet de récuperer les valeurs en post sous format json
app.run(function($rootScope, $window) {

	$rootScope.back = function() {
		console.log('back', arguments);
		$window.history.back();
	};

	$rootScope.goto = function(url) {
		console.log('goto', arguments);
		$window.location.href = url;
	};

});

