import './css/lg-ad.scss';
import './css/create-ad.scss';
import './css/style.scss';
import './css/overlay.scss';

import lgCarrier from './modules/business/lg-carrier/lg-carrier.module.js';
import lgConfig from './modules/business/lg-config/lg-config.js';
import lgConnection from './modules/business/lg-connection/lg-connection.js';
import lgLoader from './modules/business/lg-loader/lg-loader.js';
import lgPassword from './modules/business/lg-password/lg-password.js';
import lgProposal from './modules/business/lg-proposal/lg-proposal.js';
import lgTruck from './modules/business/lg-truck/lg-truck.js';

import lgChoice from './modules/form/lg-choice/lg-choice.js';
import lgDatetime from './modules/form/lg-datetime/lg-datetime.js';
import lgDimension from './modules/form/lg-dimension/lg-dimension.js';
import lgEyePassword from './modules/form/lg-eyepassword/lg-eyepassword.js';
import lgFilter from './modules/form/lg-filter/lg-filter.js';
import lgFormValidator from './modules/form/lg-form-validator/lg-form-validator.js';
import lgOrderby from './modules/form/lg-orderby/lg-orderby.js';
import lgNum from './modules/form/lg-num/lg-num.js';
import lgSlider from './modules/form/lg-slider/lg-slider.js';
import lgLoadImage from './modules/form/lg-load-image/lg-load-image.js';

import lgDesktop from './modules/site/lg-desktop/lg-desktop.js';
import lgMenu from './modules/site/lg-menu/lg-menu.js';
import lgRoute from './modules/site/lg-route/lg-route.js';

import lgDebug from './modules/technic/lg-debug/lg-debug.service.js';
import lgError from './modules/technic/lg-error/lg-error.js';
import lgFilterList from './modules/technic/lg-filter-list/lg-filter-list.service.js';
import lgGeoloc from './modules/technic/lg-geoloc/geoloc.service.js';
import lgHttp from './modules/technic/lg-http/lg-http.js';
import lgMisc from './modules/technic/lg-misc/lg-misc.module.js';
import lgTest from './modules/technic/lg-test/lg-test.module.js';
import lgWidget from './modules/technic/lg-widget/lg-widget.js';
import lgBackDetector from './modules/technic/lg-back-detector/lg-back-detector.service.js';

angular.module('main', [
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
	lgLoadImage,

	lgDesktop,
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
