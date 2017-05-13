<?php
	require_once(BASE_DIR . '/class/Event.php');

	class Geoloc {

		public static function searchCity($city) {
			$q = $city->city . ' ' . $city->region  . ' ' . $city->country;
			$q = str_replace(' ', '+', $q);
			$result = self::retrieve('city', $q);
			if ($result !== NULL) {
				debug('searchCity: Using cache', $result);
				return $result;
			}
			debug('searchCity: Calling OSM', $result);
			$url = 'http://nominatim.openstreetmap.org/search?q=' . $q . '&format=json';
			$json = json_decode(file_get_contents($url));
			$result = $json[0];
			$content = array(
				'key' => $q,
				'result' => $result
			);
			$e = Event::insert('/geoloc/city', $content);
			Event::synchronize();
			return $result;
		}

		public static function route($request) {
			$departure = self::searchCity($request->departure);
			$arrival = self::searchCity($request->arrival);
			$q = $departure->lon . ',' . $departure->lat . ';' . $arrival->lon . ',' . $arrival->lat;
			$result = self::retrieve('route', $q);
			if ($result !== NULL) {
				debug('route: Using cache', $result);
				return $result;
			}
			// route not stored in cache so retrive it from a web service
			// OSRM way:
			$result = self::routeUsingOSRM($q);
			if (!$result) {
				$result = self::routeUsingGoogle($request);
			}
			if (!$result) {
				throw new Exception(ERROR_CANNOT_GET_ROUTE_MSG, ERROR_CANNOT_GET_ROUTE_CODE);
			}


			$content = array(
				'key' => $q,
				'result' => $result
			);
			$e = Event::insert('/geoloc/route', $content);
			Event::synchronize();
			return $result;
		}

		public static function routeUsingOSRM($q) {
			$url = 'http://router.project-osrm.org/route/v1/driving/' . $q . '?overview=false';
			$response = @file_get_contents($url);
			if ($response === FALSE) {
				return FALSE;
			}
			$json = json_decode($response);
			debug('OSRM called: $json', $json);
			$result = $json->routes[0];
			return $result;
		}

		public static function routeUsingGoogle($request) {
			global $cfg;

			$origins = $request->departure->city . '+' . $request->departure->region  . '+' . $request->departure->country;
			$origins = str_replace(' ', '+', $origins);
			$destinations = $request->arrival->city . '+' . $request->arrival->region  . '+' . $request->arrival->country;
			$destinations = str_replace(' ', '+', $destinations);
			$url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' .
				$origins . '&destinations=' . $destinations . '&key=' . $cfg->routeGoogleAPIKey;
			debug('Google $url', $url);
			$googleJson = json_decode(@file_get_contents($url));
			if ($googleJson == NULL) {
				return FALSE;
			}
			debug('Google called: $googleJson', $googleJson);
			$row = $googleJson->rows[0];
			debug('Google called: $googleJson', $row);
			debug('Google called: $googleJson', $row->elements[0]);
			if (!property_exists($row->elements[0], 'duration')) {
				return FALSE;
			}
			$result = array(
				'duration' => $googleJson->rows[0]->elements[0]->duration->value,
				'distance' => $googleJson->rows[0]->elements[0]->distance->value,
			);
			return $result;
		}

		public static function retrieve($type, $key) {
			global $db, $cfg;
			// On lance notre requête de vérification
			$sql = <<<EOF
SELECT `content` FROM {$cfg->prefix}geoloc WHERE `type` = :type AND `key` = :key
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':type' => $type,
				':key' => $key
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			if ($st->rowCount() == 0) {
				debug("Geoloc: Cannot retrieve content where type = $type and key = $key");
				return NULL;
			}

			$array = $st->fetch();
			return json_decode($array['content']);
		}


	}

