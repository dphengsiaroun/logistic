<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/include/loader.inc.php");

	$request = getRequest();
	debug("update loader start");
	debug('request', $request);

	$result = [];
	try {
		$account = Account::getConnected();
		$loader = Loader::update($account, $request);

		$result['status'] = 'ok';
		$result['loader'] = $loader;
		debug('result', $result['loader']);

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
