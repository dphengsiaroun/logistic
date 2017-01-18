'use strict';

module.exports = 'lg-geoloc';

var app = angular.module(module.exports, []);

app.service('geoloc', function Geoloc() {
	this.countryMap = {
		'RADP': 'Algérie',
	};
	this.mapCountry = function(str) {
		if (str in this.countryMap) {
			return this.countryMap[str];
		}
		return str;
	};
});
