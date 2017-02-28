<?php

	define('BASE_DIR', dirname(__DIR__));
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");

	$result = [];
	try {
		$result['status'] = 'ok';
		$result['serverConfig'] = array(
			'routeGoogleAPIKey' => $cfg->routeGoogleAPIKey
		);
		debug('result', $result);

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
