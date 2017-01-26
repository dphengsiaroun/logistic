<?php
	require_once(BASE_DIR . '/include/event.inc.php');

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
			$url = 'http://router.project-osrm.org/route/v1/driving/' . $q . '?overview=false';
			$json = json_decode(file_get_contents($url));
			debug('OSRM called: $json', $json);
			$result = $json->routes[0];
			$content = array(
				'key' => $q,
				'result' => $result
			);
			$e = Event::insert('/geoloc/route', $content);
			Event::synchronize();
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

