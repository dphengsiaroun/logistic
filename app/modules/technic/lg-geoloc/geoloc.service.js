module.exports = 'lg-geoloc';

const app = angular.module(module.exports, []);

app.service('geoloc', function Geoloc($q, $window, $http, $rootScope, $parse, $filter, lgConfig) {
	'ngInject';
	const service = this;
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
		const result = {};
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
					const cityObj = service.getCityObj();
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

	this.updateInfoRoute = function(scope, watchStr) {
		scope.$watchGroup([
			watchStr + '.departureCity',
			watchStr + '.arrivalCity'],
		function() {
			const data = $parse(watchStr)(scope);
			if (!(data.departureCity && data.arrivalCity)) {
				data.infoRoute = '';
				return;
			}
			$http({
				url: lgConfig.wsDir() + 'geoloc/route.php',
				method: 'POST',
				data: {
					departure: data.departureCity,
					arrival: data.arrivalCity
				},
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function(response) {
				console.log('response', response);
				if (response.data.status === 'ko') {
					return $q.reject(response);
				}
				data.minDuration = response.data.route.duration;
				data.distance = Math.round(response.data.route.distance / 1000);
				const durationStr = $filter('duration')(data.minDuration);
				data.infoRoute = 'Distance : <b>' + data.distance +
					'km</b> - Durée min. : <b>' + durationStr + '</b>';
			}).catch(function(error) {
				console.error('error', error);
				data.infoRoute = '';
			});
		});
	};
});
