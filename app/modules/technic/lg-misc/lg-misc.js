'use strict';

module.exports = 'lg-misc';

var app = angular.module(module.exports, []);

require('./lg-misc.scss');

app.service('lgMisc', ['$injector', function LgMisc($injector) {
    this.isWebService = function(url) {
		var result = url.match(/ws\//);
        return result;
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

app.filter('duration', function duration($filter) {
    'ngInject';
    return function(duration) {
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


app.filter('ucfirst', function() {
    'ngInject';
    return function(str) {
        if (typeof str !== 'string') {
            return undefined;
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
});


app.filter('ts2date', function() {
    'ngInject';
    return function(timestamp) {
        return new Date(timestamp * 1000);
    };
});

app.filter('volume', function() {
    'ngInject';
    return function(dimension) {
        if (dimension && dimension.width && dimension.height && dimension.depth) {
            return (dimension.width * dimension.height * dimension.depth).toFixed(3) + 'm3';
        }
        return '';
    };
});

app.filter('googlemap', function($rootScope) {
    'ngInject';
    return function(content) {
        if (!content || !content.departureCity || !content.arrivalCity) {
            return '';
        }
        var result = 'https://www.google.com/maps/dir/' +
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
});
