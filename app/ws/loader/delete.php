<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/include/loader.inc.php");

	debug("delete loader start");

	$result = [];
	try {
		Loader::delete();

		$result['status'] = 'ok';

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
