'use strict';

require('angular/angular-csp.css');
require('font-awesome/css/font-awesome.css');

require('./css/create-ad.scss');
require('./css/lg-ad.scss');
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

var lgCarrier = require('./modules/business/lg-carrier/lg-carrier.js');
var lgConfig = require('./modules/business/lg-config/lg-config.js');
var lgConnection = require('./modules/business/lg-connection/lg-connection.js');
var lgLoader = require('./modules/business/lg-loader/lg-loader.js');
var lgPassword = require('./modules/business/lg-password/lg-password.js');
var lgProposal = require('./modules/business/lg-proposal/lg-proposal.js');
var lgTruck = require('./modules/business/lg-truck/lg-truck.js');

var lgCalendar = require('./modules/form/lg-calendar/lg-calendar.js');
var lgChoice = require('./modules/form/lg-choice/lg-choice.js');
var lgDatetime = require('./modules/form/lg-datetime/lg-datetime.js');
var lgDimension = require('./modules/form/lg-dimension/lg-dimension.js');
var lgEyePassword = require('./modules/form/lg-eyepassword/lg-eyepassword.js');
var lgNum = require('./modules/form/lg-num/lg-num.js');
var lgSlider = require('./modules/form/lg-slider/lg-slider.js');
var lgUpload = require('./modules/form/lg-upload/lg-upload.js');
var lgFilter = require('./modules/form/lg-filter/lg-filter.js');

var lgMenu = require('./modules/site/lg-menu/lg-menu.js');
var lgRoute = require('./modules/site/lg-route/lg-route.js');

var lgDebug = require('./modules/technic/lg-debug/lg-debug.js');
var lgError = require('./modules/technic/lg-error/lg-error.js');
var lgGeoloc = require('./modules/technic/lg-geoloc/lg-geoloc.js');
var lgHttp = require('./modules/technic/lg-http/lg-http.js');
var lgMisc = require('./modules/technic/lg-misc/lg-misc.js');
var lgTest = require('./modules/technic/lg-test/lg-test.js');
var lgWidget = require('./modules/technic/lg-widget/lg-widget.js');
var lgBackDetector = require('./modules/technic/lg-back-detector/lg-back-detector.js');

window.values = function(obj) {
	return Object.keys(obj).map(function(key) {
		return obj[key];
	});
};

window.makeMap = function(array) {
	var map = {};
	array.forEach(function(n) {
		map[n.id] = n;
	});
	return map;
};

var app = angular.module('mainApp', [
	'ngTouch',
	'ngSanitize',
	'vcRecaptcha',
	'ui.mask',
	'ui.router',

	lgCarrier,
	lgConfig,
	lgConnection,
	lgLoader,
	lgPassword,
	lgProposal,
	lgTruck,

	lgCalendar,
	lgChoice,
	lgDatetime,
	lgDimension,
	lgEyePassword,
	lgNum,
	lgSlider,
	lgUpload,
	lgFilter,

	lgMenu,
	lgRoute,

	lgDebug,
	lgError,
	lgGeoloc,
	lgHttp,
	lgMisc,
	lgTest,
	lgWidget,
	lgBackDetector
]);

app.config(function($touchProvider) {
	'ngInject';
	$touchProvider.ngClickOverrideEnabled(true);
});

app.config(function($sceDelegateProvider) {
	'ngInject';
	$sceDelegateProvider.resourceUrlWhitelist([
		// Allow same origin resource loads.
		'self',
		// Allow loading from our assets domain.  Notice the difference between * and **.
		'https://www.google.com/**'
	]);
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

	$rootScope.hello = function() {
		// alert('hello');
	};

});

