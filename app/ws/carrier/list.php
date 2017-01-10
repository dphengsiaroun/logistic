<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/include/truck.inc.php");

	debug("list truck start");

	$result = [];
	try {
		$account = Account::getConnected();
		$trucks = Truck::listAll($account);

		$result['status'] = 'ok';
		$result['trucks'] = $trucks;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
