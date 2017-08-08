import './lg-datetime.scss';

import {lgDtMonth} from './lg-dt-month.js';
import {lgDtHour} from './lg-dt-hour.js';
import {lgDatetime} from './lg-datetime-cmpt.js';

module.exports = 'lg-datetime';
angular.module(module.exports, ['lg-misc'])
.component('lgDatetime', lgDatetime)
.component('lgDtMonth', lgDtMonth)
.component('lgDtHour', lgDtHour);




