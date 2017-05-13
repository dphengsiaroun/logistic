<?php

	require_once(BASE_DIR . '/class/RestResource.php');

	class Loader extends RestResource {
		public static function getName() {
			return 'Loader';
		}
	}

