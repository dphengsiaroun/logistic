<?php
	
	define("BASE_DIR", dirname(dirname($_SERVER["SCRIPT_FILENAME"])));
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/install.inc.php");
	
	debug("init-obj");
	try {
		$obj = getObj();
		$result = array(
			'status' => 'ok',
			'obj' => $obj
		);

		// On encode le tableau array en format json pour angular
		echo json_encode($result);
	} catch (Exception $e) {
		echo json_encode(array(
			"status" => "ko",
			"errorMsg" => $e->getMessage()
		));
	}
