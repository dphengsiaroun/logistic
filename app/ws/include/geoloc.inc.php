<?php

	require_once(BASE_DIR . '/include/constant.inc.php');
	require_once(BASE_DIR . '/include/misc.inc.php');
	require_once(BASE_DIR . '/include/database.inc.php');

	class Geoloc {

		public static function route($request) {
			return array(
				'distance' => 120,
				'duration' => 4000
			);
		}


	}

