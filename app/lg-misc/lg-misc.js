'use strict';

module.exports = 'lg-misc';

var app = angular.module(module.exports, []);



app.service('lgMisc', ['$injector', function LgMisc($injector) {
	this.isWebService  = function(url) {
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
