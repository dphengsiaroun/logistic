<?php
	
	define("BASE_DIR", dirname(dirname($_SERVER["SCRIPT_FILENAME"])));
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/install.inc.php");
	
	debug("start");
	try {
		// Permet de récuperer les données au format Json depuis angular
		$postdata = file_get_contents("php://input");
		debug("start2");
		// on décode le json en variable PHP
		$request = json_decode($postdata);
		initAttr($request, 'dbCreation');
		debug("start2");
		debug("request=" . $request->username);
		debug("dbCreation=" . $request->dbCreation);

		createConfigIniFile($request);
		installDatabase($request);

		// Supprimer le dossier install
		// deleteDirectory(INSTALL_DIR);

		$result = array(
			"status" => "ok"
		);

		// On encode le tableau array en format json pour angular
		echo json_encode($result);
	} catch (Exception $e) {
		echo json_encode(array(
			"status" => "ko",
			"errorMsg" => $e->getMessage()
		));
	}
?>