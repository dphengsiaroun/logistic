<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/include/carrier.inc.php");


	debug("create carrier start");

	$result = [];
	try {
		$carrier = Carrier::create();

		$result['status'] = 'ok';
		$result['carrier'] = $carrier;
		debug('result', $result['carrier']);

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
