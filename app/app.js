'use strict';

require('angular/angular-csp.css');

require('font-awesome/css/font-awesome.css');

require('./lg-eyepassword/lg-eyepassword.css');

require('./css/create-ad.scss');
require('./css/style.scss');

window.Hashes = require('jshashes');
var $ = require('jquery');
window.jQuery = $;
window.$ = $;

require('angular');
require('angular-touch');
require('angular-i18n/angular-locale_fr-dz.js');
require('angular-sanitize');
require('angular-ui-router');
require('angular-ui-mask');
require('angular-recaptcha');


var lgMisc = require('./lg-misc/lg-misc.js');
var lgRoute = require('./lg-route/lg-route.js');
var lgMenu = require('./lg-menu/lg-menu.js');
var lgCarrier = require('./lg-carrier/lg-carrier.js');
var lgTruck = require('./lg-truck/lg-truck.js');
var lgLoader = require('./lg-loader/lg-loader.js');
var lgUser = require('./lg-user/lg-user.js');
var lgChoice = require('./lg-choice/lg-choice.js');
var lgCalendar = require('./lg-calendar/lg-calendar.js');
var lgDatetime = require('./lg-datetime/lg-datetime.js');
var lgSlider = require('./lg-slider/lg-slider.js');
var lgDimension = require('./lg-dimension/lg-dimension.js');
var lgNum = require('./lg-num/lg-num.js');
var lgEyePassword = require('./lg-eyepassword/lg-eyepassword.js');
var lgConfig = require('./lg-config/lg-config.js');
var lgWidget = require('./lg-widget/lg-widget.js');
var lgUpload = require('./lg-upload/lg-upload.js');
var lgHttp = require('./lg-http/lg-http.js');
var lgError = require('./lg-error/lg-error.js');

var lgDebug = require('./lg-debug/lg-debug.js');
var lgTest = require('./lg-test/lg-test.js');

window.values = function(obj) {
	return Object.keys(obj).map(function(key) {
		return obj[key];
	});
};

var app = angular.module('mainApp', [
	'ngTouch',
	'ngSanitize',
	'vcRecaptcha',
	'ui.mask',
	'ui.router',
	lgRoute,
	lgUpload,
	lgMenu,
	lgUser,
	lgCarrier,
	lgLoader,
	lgTruck,
	lgChoice,
	lgCalendar,
	lgDatetime,
	lgSlider,
	lgDimension,
	lgEyePassword,
	lgConfig,
	lgWidget,
	lgHttp,
	lgError,
	lgMisc,
	lgNum,
	lgDebug,
	lgTest
	]);

app.config(function($touchProvider) {
	'ngInject';
	$touchProvider.ngClickOverrideEnabled(true);
});

// permet de récuperer les valeurs en post sous format json
app.run(function($rootScope, $window, $state, $parse) {
	'ngInject';
	$rootScope.back = function() {
		console.log('back', arguments);
		$window.history.back();
	};

	$rootScope.goto = function(url) {
		console.log('goto', arguments);
		$window.location.href = url;
	};

	$rootScope.goToState = function(state) {
		console.log('goToState', arguments);
		var array = state.split(/[()]/);
		var to = array[0];
		var params = $parse(array[1])({});
		console.log('goto', to, params);
		$state.go(to, params);
	};

});

