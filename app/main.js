import './css/lg-ad.scss';
import './css/create-ad.scss';
import './css/style.scss';
import './css/overlay.scss';

import lgCarrier from './modules/business/lg-carrier/lg-carrier.js';
import lgConfig from './modules/business/lg-config/lg-config.js';
import lgConnection from './modules/business/lg-connection/lg-connection.js';
import lgLoader from './modules/business/lg-loader/lg-loader.js';
import lgPassword from './modules/business/lg-password/lg-password.js';
import lgProposal from './modules/business/lg-proposal/lg-proposal.js';
import lgTruck from './modules/business/lg-truck/lg-truck.js';

const lgChoice = require('./modules/form/lg-choice/lg-choice.js');
const lgDatetime = require('./modules/form/lg-datetime/lg-datetime.js');
const lgDimension = require('./modules/form/lg-dimension/lg-dimension.js');
const lgEyePassword = require('./modules/form/lg-eyepassword/lg-eyepassword.js');
const lgFilter = require('./modules/form/lg-filter/lg-filter.js');
const lgFormValidator = require('./modules/form/lg-form-validator/lg-form-validator.js');
const lgOrderby = require('./modules/form/lg-orderby/lg-orderby.js');
const lgNum = require('./modules/form/lg-num/lg-num.js');
const lgSlider = require('./modules/form/lg-slider/lg-slider.js');
const lgUpload = require('./modules/form/lg-upload/lg-upload.js');

const lgMenu = require('./modules/site/lg-menu/lg-menu.js');
const lgRoute = require('./modules/site/lg-route/lg-route.js');

const lgDebug = require('./modules/technic/lg-debug/lg-debug.js');
const lgError = require('./modules/technic/lg-error/lg-error.js');
const lgFilterList = require('./modules/technic/lg-filter-list/lg-filter-list.js');
const lgGeoloc = require('./modules/technic/lg-geoloc/lg-geoloc.js');
const lgHttp = require('./modules/technic/lg-http/lg-http.js');
const lgMisc = require('./modules/technic/lg-misc/lg-misc.js');
const lgTest = require('./modules/technic/lg-test/lg-test.js');
const lgWidget = require('./modules/technic/lg-widget/lg-widget.js');
const lgBackDetector = require('./modules/technic/lg-back-detector/lg-back-detector.js');

const app = angular.module('main', [
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

	lgChoice,
	lgDatetime,
	lgDimension,
	lgEyePassword,
	lgFilter,
	lgFormValidator,
	lgOrderby,
	lgNum,
	lgSlider,
	lgUpload,

	lgMenu,
	lgRoute,

	lgDebug,
	lgError,
	lgFilterList,
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

