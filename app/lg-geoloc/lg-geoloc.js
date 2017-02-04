'use strict';

module.exports = 'lg-geoloc';

var app = angular.module(module.exports, []);

app.service('geoloc', function Geoloc($q, $window, $http, $rootScope) {
	'ngInject';
	var service = this;
	this.countryMap = {
		'RADP': 'Algérie',
	};
	this.geopos = undefined;
	this.address = undefined;
	this.displayCity = undefined;
	this.mapCountry = function(str) {
		if (str in this.countryMap) {
			return this.countryMap[str];
		}
		return str;
	};

	this.getCityObj = function() {
		var result = {};
		result.city = service.address.city || service.address.town;
		result.region = service.address.state;
		result.country = service.mapCountry(service.address.country);
		return result;
	};

	this.guessCity = function() {
		return $q(function(resolve, reject) {
			if (service.geopos && service.address) {
				console.log('guessCity returns cache');
				return resolve(service.getDisplayCity());
			}
			if (!$window.navigator.geolocation) {
				alert('Gps non supporté.');
				return reject('window.navigator.geolocation undefined');
			}
			console.log('try to getCurrentPosition');
			$window.navigator.geolocation.getCurrentPosition(function(geopos) {
				console.log('getCurrentPosition', arguments);
				service.geopos = geopos;
				$http({
					url: 'https://nominatim.openstreetmap.org/reverse',
					method: 'GET',
					params: {
						format: 'json',
						lat: geopos.coords.latitude,
						lon: geopos.coords.longitude,
						// lat: 33.324754,
						// lon: 1.879442,
						zoom: 18,
						addressdetails: 1
					}
				}).then(function(response) {
					console.log('response', response);
					service.address = response.data.address;
					var cityObj = service.getCityObj();
					if ($rootScope.config.cities.indexOf(cityObj) === -1) {
						$rootScope.config.cities.push(cityObj);
					}
					return resolve(cityObj);
				}).catch(function(error) {
					reject(error);
				});
			}, function(error) {
				alert('Geoloc non activée.', error);
			});
		});
	};
});
