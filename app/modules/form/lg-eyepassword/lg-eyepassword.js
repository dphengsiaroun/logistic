module.exports = 'lg-eyepassword';
import './lg-eyepassword.scss';

import { inputDirective } from './input.directive.js';
import { LgEyepassword } from './lg-eyepassword.component.js';

angular.module(module.exports, [])
    .directive('input', inputDirective)
    .component('lgEyepassword', LgEyepassword);
