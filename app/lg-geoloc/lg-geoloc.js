'use strict';

module.exports = 'lg-geoloc';

var app = angular.module(module.exports, []);

app.service('geoloc', function Geoloc($q, $window, $http, $rootScope) {
	'ngInject';
	var service = this;
	this.countryMap = {
		'RADP': 'Algérie',
	};
	this.mapCountry = function(str) {
		if (str in this.countryMap) {
			return this.countryMap[str];
		}
		return str;
	};

	this.guessCity = function() {
		return $q(function(resolve, reject) {
			if (!$window.navigator.geolocation) {
				return reject('window.navigator.geolocation undefined');
			}
			console.log('try to getCurrentPosition');
			$window.navigator.geolocation.getCurrentPosition(function(geopos) {
				console.log('getCurrentPosition', arguments);
				$http({
					url: 'http://nominatim.openstreetmap.org/reverse',
					method: 'GET',
					params: {
						format: 'json',
						lat: geopos.coords.latitude,
						lon: geopos.coords.longitude,
						//lat: 33.324754,
						//lon: 1.879442,
						zoom: 18,
						addressdetails: 1
					}
				}).then(function(response) {
					console.log('response', response);
					var city = response.data.address.city || response.data.address.town;
					var displayCity = [city, 
					response.data.address.state, service.mapCountry(response.data.address.country)].join(', ');
					if ($rootScope.config.cities.indexOf(displayCity) === -1) {
						$rootScope.config.cities.push(displayCity);
					}
					return resolve(displayCity);
				}).catch(function(error) {
					reject(error);
				});
			});
		});
	};
});
