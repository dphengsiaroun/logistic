import './lg-form-validator.scss';
module.exports = 'lg-form-validator';

import { FormValidator } from './form-validator.service.js';

angular.module(module.exports, [])
	.service('formValidator', FormValidator);
