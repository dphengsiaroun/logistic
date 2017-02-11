'use strict';

module.exports = 'lg-misc';

var app = angular.module(module.exports, []);

require('./lg-misc.scss');

app.service('lgMisc', ['$injector', function LgMisc($injector) {
	this.isWebService = function(url) {
		return url.match(/ws\/.*\.php/);
	};
}]);

app.service('lgSequence', function LgSequence() {
	this.current = 0;
	this.next = function() {
		this.current++;
		return this.current;
	};
});

app.service('lgScroll', function LgScroll($window, $document) {
	'ngInject';
	var body = $document.find('body').eq(0);
	this.lastSaved = 0;
	this.save = function() {
		this.lastSaved = $window.scrollY;
		body.addClass('lg-scroll-noscroll');
	};
	this.restore = function() {
		body.removeClass('lg-scroll-noscroll');
		$window.scrollTo(0, this.lastSaved);

	};
});

app.service('lgFormat', function LgFormat($filter) {
	'ngInject';
	this.formatDuration = function(duration) {
		var result = '';
		var minuteFormat = 'mm';
		var hourFormat = ' et \'H\'h\'';
		if (duration % (60 * 60) === 0) {
			minuteFormat = '';
			if (duration % (24 * 60 * 60) === 0) {
				hourFormat = '';
			}
		}
		if (duration < 24 * 60 * 60) {
			result = $filter('date')(duration * 1000, 'H\'h\'' + minuteFormat, 'UTC');
		} else {

			result = $filter('date')((duration - 24 * 60 * 60) * 1000, 'd\'j' + hourFormat + minuteFormat, 'UTC');
		}
		return result;
	};
});

app.filter('distance', function() {
	'ngInject';
	return function(number) {
		var integer = Math.floor(number);
		var decimal = Math.round((number - integer) * 100);
		var decimalStr = '' + decimal;
		if (decimal < 10) {
			decimalStr = '0' + decimal;
		}
		return integer + 'm' + decimalStr;
	};
});
