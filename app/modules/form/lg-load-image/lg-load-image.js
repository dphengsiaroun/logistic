import './lg-load-image.scss';

module.exports = 'lg-load-image';

import {LgImageLoader} from './lg-image-loader.service.js';
import {LgLoadImage} from './lg-load-image.component.js';

angular.module(module.exports, [])
	.component('lgLoadImage', LgLoadImage)
	.service('lgImageLoader', LgImageLoader);
