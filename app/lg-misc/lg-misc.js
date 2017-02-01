'use strict';

module.exports = 'lg-misc';

var app = angular.module(module.exports, []);

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

app.service('lgScroll', ['$injector', function LgScroll($injector) {
	var $window = $injector.get('$window');
	this.lastSaved = 0;
	this.save = function() {
		this.lastSaved = $window.scrollY;
	};
	this.restore = function() {
		$window.scrollTo(0, this.lastSaved);
	};
}]);

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
		if (duration < 24*60*60) {
			result = $filter('date')(duration*1000, 'H\'h\'' + minuteFormat, 'UTC');
		} else {

			result = $filter('date')((duration - 24*60*60)*1000, 'd\'j' + hourFormat + minuteFormat, 'UTC');
		}
		return result;
	};
});
