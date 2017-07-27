require('angular/angular-csp.css');
require('font-awesome/css/font-awesome.css');

require('./css/create-ad.scss');
require('./css/lg-ad.scss');
require('./css/style.scss');

const $ = require('jquery');
window.jQuery = $;
window.$ = $;

require('angular');
require('angular-touch');
require('angular-i18n/angular-locale_fr-dz.js');
require('angular-sanitize');
require('angular-ui-router');
require('angular-ui-mask');
require('angular-recaptcha');

const lgCarrier = require('./modules/business/lg-carrier/lg-carrier.js');
const lgConfig = require('./modules/business/lg-config/lg-config.js');
const lgConnection = require('./modules/business/lg-connection/lg-connection.js');
const lgLoader = require('./modules/business/lg-loader/lg-loader.js');
const lgPassword = require('./modules/business/lg-password/lg-password.js');
const lgProposal = require('./modules/business/lg-proposal/lg-proposal.js');
const lgTruck = require('./modules/business/lg-truck/lg-truck.js');

const lgCalendar = require('./modules/form/lg-calendar/lg-calendar.js');
const lgChoice = require('./modules/form/lg-choice/lg-choice.js');
const lgDatetime = require('./modules/form/lg-datetime/lg-datetime.js');
const lgDimension = require('./modules/form/lg-dimension/lg-dimension.js');
const lgEyePassword = require('./modules/form/lg-eyepassword/lg-eyepassword.js');
const lgNum = require('./modules/form/lg-num/lg-num.js');
const lgSlider = require('./modules/form/lg-slider/lg-slider.js');
const lgUpload = require('./modules/form/lg-upload/lg-upload.js');
const lgFilter = require('./modules/form/lg-filter/lg-filter.js');

const lgMenu = require('./modules/site/lg-menu/lg-menu.js');
const lgRoute = require('./modules/site/lg-route/lg-route.js');

const lgDebug = require('./modules/technic/lg-debug/lg-debug.js');
const lgError = require('./modules/technic/lg-error/lg-error.js');
const lgGeoloc = require('./modules/technic/lg-geoloc/lg-geoloc.js');
const lgHttp = require('./modules/technic/lg-http/lg-http.js');
const lgMisc = require('./modules/technic/lg-misc/lg-misc.js');
const lgTest = require('./modules/technic/lg-test/lg-test.js');
const lgWidget = require('./modules/technic/lg-widget/lg-widget.js');
const lgBackDetector = require('./modules/technic/lg-back-detector/lg-back-detector.js');

window.values = function(obj) {
	return Object.keys(obj).map(function(key) {
		return obj[key];
	});
};

window.makeMap = function(array) {
	const map = {};
	array.forEach(function(n) {
		map[n.id] = n;
	});
	return map;
};

const app = angular.module('mainApp', [
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
		const array = state.split(/[()]/);
		const to = array[0];
		const params = $parse(array[1])({});
		console.log('goto', to, params);
		$state.go(to, params);
	};

	$rootScope.hello = function() {
		// alert('hello');
	};

});

