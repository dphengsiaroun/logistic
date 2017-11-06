module.exports = 'lg-misc';
import './lg-misc.scss';

import '../lg-mobile/lg-mobile.module.js';

import { LgMisc } from './lg-misc.service.js';
import { LgSequence } from './lg-sequence.service.js';
import { LgScroll } from './lg-scroll.service.js';
import { durationFilter } from './duration.filter.js';
import { distanceFilter } from './distance.filter.js';
import { ucfirstFilter } from './ucfirst.filter.js';
import { ts2dateFilter } from './ts2date.filter.js';
import { volumeFilter } from './volume.filter.js';
import { googlemapFilter } from './googlemap.filter.js';

angular.module(module.exports, ['lg-mobile'])
	.service('lgMisc', LgMisc)
	.service('lgSequence', LgSequence)
	.service('lgScroll', LgScroll)
	.filter('duration', durationFilter)
	.filter('distance', distanceFilter)
	.filter('ucfirst', ucfirstFilter)
	.filter('ts2date', ts2dateFilter)
	.filter('volume', volumeFilter)
	.filter('googlemap', googlemapFilter);
