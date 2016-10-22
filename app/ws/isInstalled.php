<?php
	
	define("BASE_DIR", ".");
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/install.inc.php");
	session_start();
	debug("start");
	$result = array(
		"result" => "ok"
	);
	try {
		if (!isConfigIniFileExisting()) {
			throw new Exception();
		}

		if (!isDatabaseExisting()) {
			throw new Exception();
		}


		$result["answer"] = "yes";

	} catch (Exception $e) {
		$result["answer"] = "no";
	}
	echo json_encode($result);
?>