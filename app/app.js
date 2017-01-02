'use strict';

require('font-awesome/css/font-awesome.css');
require('./css/segmented-controls.css');

require('./lg-eyepassword/lg-eyepassword.css');

require('./css/create-add.css');
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
var lgRoute = require('./lg-route/lg-route.js');
var lgMenu = require('./lg-menu/lg-menu.js');
var lgSvg = require('./lg-svg/lg-svg.js');
var lgCarrier = require('./lg-carrier/lg-carrier.js');
var lgTruck = require('./lg-truck/lg-truck.js');
var lgLoader = require('./lg-loader/lg-loader.js');
var lgUser = require('./lg-user/lg-user.js');
var lgChoice = require('./lg-choice/lg-choice.js');
var lgCalendar = require('./lg-calendar/lg-calendar.js');
var lgNum = require('./lg-num/lg-num.js');
var lgEyePassword = require('./lg-eyepassword/lg-eyepassword.js');
var lgConfig = require('./lg-config/lg-config.js');
var lgWidget = require('./lg-widget/lg-widget.js');
var lgUpload = require('./lg-upload/lg-upload.js');
var lgDebug = require('./lg-debug/lg-debug.js');
var lgHttp = require('./lg-http/lg-http.js');
var lgError = require('./lg-error/lg-error.js');


var app = angular.module('mainApp', [
	'ngSanitize',
	'vcRecaptcha',
	lgRoute,
	lgUpload,
	lgMenu,
	lgSvg,
	lgUser,
	lgCarrier,
	lgLoader,
	lgTruck,
	lgChoice,
	lgCalendar,
	lgEyePassword,
	lgConfig,
	lgWidget,
	lgDebug,
	lgHttp,
	lgError,
	lgMisc,
	lgNum
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

