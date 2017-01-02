'use strict';

require('font-awesome/css/font-awesome.css');
require('./css/segmented-controls.css');

require('./lg-calendar/lg-calendar.css');
require('./lg-calendar/lg-hour.css');
require('./lg-calendar/lg-hour2.css');
require('./lg-num/lg-num.css');
require('./lg-num/lg-num-vertical.css');
require('./lg-upload/lg-upload.css');
require('./lg-eyepassword/lg-eyepassword.css');
require('./lg-widget/lg-hr.css');
require('./lg-widget/lg-widget.css');


require('./css/create-add.css');
require('./lg-route/css/lg-home-route.css');

require('./css/style.css');

window.Hashes = require('jshashes');
var $ = require('jquery');
window.jQuery = $;
window.$ = $;

require('angular');
require('angular-touch');
require('angular-i18n/angular-locale_fr-dz.js');
require('angular-sanitize');
require('angular-ui-router');
require('angular-recaptcha');


var lgMisc = require('./lg-misc/lg-misc.js');
require('./lg-route/lg-route.js');
var lgMenu = require('./lg-menu/lg-menu.js');
require('./lg-svg/lg-svg.js');
require('./lg-carrier/lg-carrier.js');
require('./lg-truck/lg-truck.js');
require('./lg-loader/lg-loader.js');
var lgUser = require('./lg-user/lg-user.js');
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
	lgMenu,
	'lg-svg',
	lgUser,
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
	lgMisc,
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

