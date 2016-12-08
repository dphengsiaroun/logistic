<?php
	
	define("BASE_DIR", dirname(dirname($_SERVER["SCRIPT_FILENAME"])));
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	require_once(BASE_DIR . "/include/install.inc.php");

	session_start();
	debug("start");
	debug_r("start", $host);
	debug_r("start", $user);
	debug_r("start", $mdp);
	debug_r("start", $bdd);
	$result = array(
		"status" => "ok"
	);
	try {
		if (!isConfigIniFileExisting()) {
			throw new Exception('ini file not existing');
		}

		if (!isDatabaseExisting()) {
			throw new Exception('database not existing');
		}


		$result["answer"] = "yes";

	} catch (Exception $e) {
		$result["answer"] = "no";
		$result["reason"] = $e->getMessage();
		$result["ini"] = CONFIG_INI;
	}
	echo json_encode($result);
?>