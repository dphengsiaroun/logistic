<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/include/truck.inc.php");

	$request = getRequest();
	debug("create truck start");

	$result = [];
	try {
		$account = Account::getConnected();
		$truck = Truck::save($account, $request);

		$result['status'] = 'ok';
		$result['truck'] = $truck;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
