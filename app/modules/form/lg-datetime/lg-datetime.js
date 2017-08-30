import './lg-datetime.scss';

import {lgDtMonth} from './lg-dt-month.component.js';
import {lgDtHour} from './lg-dt-hour.component.js';
import {lgDatetime} from './lg-datetime.component.js';

module.exports = 'lg-datetime';
angular.module(module.exports, ['lg-misc'])
.component('lgDatetime', lgDatetime)
.component('lgDtMonth', lgDtMonth)
.component('lgDtHour', lgDtHour);




