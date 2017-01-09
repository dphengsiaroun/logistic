<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/include/loader.inc.php");

	$request = getRequest();
	debug("create loader start");
	debug('ma request', $request);

	$result = [];
	try {
		$loader = Loader::create($request);

		$result['status'] = 'ok';
		$result['loader'] = $loader;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
