<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/include/truck.inc.php");

	$result = [];
	try {
		$trucks = Truck::listAll();

		$result['status'] = 'ok';
		$result['trucks'] = $trucks;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
