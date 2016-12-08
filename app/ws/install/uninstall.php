<?php
	
	define("BASE_DIR", dirname(dirname($_SERVER["SCRIPT_FILENAME"])));
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	require_once(BASE_DIR . "/include/install.inc.php");

	session_start();
	debug("start");
	$result = array(
		"status" => "ok"
	);
	try {
		// Try to remove the database
		removeDatabase();
		// Try to remove the ini file
		removeConfigIniFile();

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>