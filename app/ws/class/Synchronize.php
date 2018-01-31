<?php

	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	require_once(BASE_DIR . "/class/Event.php");
	require_once(BASE_DIR . "/class/RestResource.php");

	class Synchronize extends RestResource {

		public function listAll() {
			Event::synchronize();
			return array();
		}


	}

