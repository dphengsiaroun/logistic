module.exports = 'lg-img-svg';

import './tmpl/lg-image.html';

import { imgSvg } from './img-svg.component.js';

angular.module(module.exports, [])
	.component('imgSvg', imgSvg);
