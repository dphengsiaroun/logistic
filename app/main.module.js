import 'normalize.css';
import './css/reset.scss';
import './css/style.scss';
import './css/lg-ad.scss';
import './css/overlay.scss';

import lgCarrier from './modules/business/lg-carrier/lg-carrier.module.js';
import lgConfig from './modules/business/lg-config/lg-config.module.js';
import lgConnection from './modules/business/lg-connection/lg-connection.module.js';
import lgLoader from './modules/business/lg-loader/lg-loader.module.js';
import lgPassword from './modules/business/lg-password/lg-password.module.js';
import lgProposal from './modules/business/lg-proposal/lg-proposal.module.js';
import lgTruck from './modules/business/lg-truck/lg-truck.module.js';

import lgChoice from './modules/form/lg-choice/lg-choice.component.js';
import lgDatetime from './modules/form/lg-datetime/lg-datetime.js';
import lgDimension from './modules/form/lg-dimension/lg-dimension.component.js';
import lgEyePassword from './modules/form/lg-eyepassword/lg-eyepassword.module.js';
import lgFilter from './modules/form/lg-filter/lg-filter.component.js';
import lgFormValidator from './modules/form/lg-form-validator/lg-form-validator.js';
import lgOrderby from './modules/form/lg-orderby/lg-orderby.component.js';
import lgNum from './modules/form/lg-num/lg-num.js';
import lgSelect from './modules/form/lg-select/lg-select.module.js';
import lgSlider from './modules/form/lg-slider/lg-slider.component.js';
import lgLoadImage from './modules/form/lg-load-image/lg-load-image.module.js';

import lgDesktop from './modules/site/lg-desktop/lg-desktop.component.js';
import lgMenu from './modules/site/lg-menu/lg-menu.js';
import lgRoute from './modules/site/lg-route/lg-route.module.js';

import lgDebug from './modules/technic/lg-debug/lg-debug.service.js';
import lgError from './modules/technic/lg-error/lg-error.js';
import lgFilterList from './modules/technic/lg-filter-list/lg-filter-list.service.js';
import lgGeoloc from './modules/technic/lg-geoloc/geoloc.service.js';
import lgHttp from './modules/technic/lg-http/lg-http.js';
import lgImgSvg from './modules/technic/lg-img-svg/lg-img-svg.module.js';
import lgMisc from './modules/technic/lg-misc/lg-misc.module.js';
import lgTest from './modules/technic/lg-test/lg-test.module.js';
import lgWidget from './modules/technic/lg-widget/lg-widget.js';
import './modules/technic/lg-back-detector/lg-back-detector.module.js';

angular.module('main', [
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
	lgSelect,
	lgSlider,
	lgLoadImage,

	lgDesktop,
	lgMenu,
	lgRoute,

	// lgDebug,
	lgError,
	lgFilterList,
	lgGeoloc,
	lgHttp,
	lgImgSvg,
	lgMisc,
	lgTest,
	lgWidget,
	'lg-back-detector',
]).config((lgConfigProvider) => {
	lgConfigProvider.wsDir('ws/');
}).run((connection, lgConfig, lgBackDetector) =>{
	lgConfig.init();
	lgBackDetector.init();
	connection.check();
});
