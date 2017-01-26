<?php

	require_once(BASE_DIR . '/include/constant.inc.php');
	require_once(BASE_DIR . '/include/misc.inc.php');
	require_once(BASE_DIR . '/include/database.inc.php');

	class Geoloc {

		public static function searchCity($city) {
			$q = $city->city . ' ' . $city->region  . ' ' . $city->country;
			$q = str_replace(' ', '+', $q);
			$url = 'http://nominatim.openstreetmap.org/search?q=' . $q . '&format=json';
			$jsonObject = json_decode(file_get_contents($url));
			$lat = $jsonObject[0]->lat;
			$lon = $jsonObject[0]->lon;
			return $jsonObject[0];
		}

		public static function route($request) {
			$departure = self::searchCity($request->departure);
			$arrival = self::searchCity($request->arrival);
			$q = $departure->lon . ',' . $departure->lat . ';' . $arrival->lon . ',' . $arrival->lat;
			$url = 'http://router.project-osrm.org/route/v1/driving/' . $q . '?overview=false';
			$jsonObject = json_decode(file_get_contents($url));
			debug('$jsonObject', $jsonObject);
			return $jsonObject->routes[0];
		}


	}

