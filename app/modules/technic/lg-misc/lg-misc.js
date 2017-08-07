module.exports = 'lg-misc';
import './lg-misc.scss';

const app = angular.module(module.exports, []);



app.service('lgMisc', ['$injector', function LgMisc($injector) {
    this.isWebService = function(url) {
		const result = url.match(/ws\//);
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
    const body = $document.find('body').eq(0);
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
        let result = '';
        let minuteFormat = 'mm';
        let hourFormat = ' et \'H\'h\'';
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
        const integer = Math.floor(number);
        const decimal = Math.round((number - integer) * 100);
        let decimalStr = '' + decimal;
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
});
