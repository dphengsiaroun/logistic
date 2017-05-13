<?php

	define('BASE_DIR', dirname(__DIR__));
	require_once(BASE_DIR . '/class/Geoloc.php');

	$request = getRequest();
	debug('geoloc', $request);

	$result = [];
	try {
		$route = Geoloc::route($request);

		$result['status'] = 'ok';
		$result['route'] = $route;
		debug('result', $result);

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
