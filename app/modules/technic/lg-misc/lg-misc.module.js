module.exports = 'lg-misc';
import './lg-misc.scss';

import { LgMisc } from './lg-misc.service.js';
import { LgSequence } from './lg-sequence.service.js';
import { LgScroll } from './lg-scroll.service.js';
import { durationFilter } from './duration-filter.service.js';


function distanceFilter() {
	'ngInject';
	return function(number) {
		const integer = Math.floor(number);
		const decimal = Math.round((number - integer) * 100);
		let decimalStr = '' + decimal;
		if (decimal < 10) {
			decimalStr = '0' + decimal;
		}
		return integer + 'm' + decimalStr;
	};
}

function ucfirstFilter() {
	'ngInject';
	return function(str) {
		if (typeof str !== 'string') {
			return undefined;
		}
		return str.charAt(0).toUpperCase() + str.slice(1);
	};
}

function ts2dateFilter() {
	'ngInject';
	return function(timestamp) {
		return new Date(timestamp * 1000);
	};
}

function volumeFilter() {
	'ngInject';
	return function(dimension) {
		if (dimension && dimension.width && dimension.height && dimension.depth) {
			return (dimension.width * dimension.height * dimension.depth).toFixed(3) + 'm3';
		}
		return '';
	};
}

function googlemapFilter() {
	'ngInject';
	return function(content) {
		if (!content || !content.departureCity || !content.arrivalCity) {
			return '';
		}
		let result = 'https://www.google.com/maps/dir/' +
			content.departureCity.city + '+' +
			content.departureCity.region + '+' +
			content.departureCity.country +
			'/' +
			content.arrivalCity.city + '+' +
			content.arrivalCity.region + '+' +
			content.arrivalCity.country;
		result = result.replace(/ /g, '+');
		return result;
	};
}

angular.module(module.exports, [])
	.service('lgMisc', LgMisc)
	.service('lgSequence', LgSequence)
	.service('lgScroll', LgScroll)
	.filter('duration', durationFilter)
	.filter('distance', distanceFilter)
	.filter('ucfirst', ucfirstFilter)
	.filter('ts2date', ts2dateFilter)
	.filter('volume', volumeFilter)
	.filter('googlemap', googlemapFilter);
