import './lg-num.scss';
import './lg-num-vertical.scss';
module.exports = 'lg-num';

import { inputDirective } from './input.directive.js';
import { LgNum } from './lg-num.component.js';

angular.module(module.exports, [])
	.directive('input', inputDirective)
	.component('lgNum', LgNum);
