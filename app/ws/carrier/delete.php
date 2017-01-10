<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/include/truck.inc.php");

    $request = getRequest();
	debug("delete truck", $request);

	$result = [];
	try {

		$account = Account::getConnected();
		Truck::delete($account, $request->id);
		$result['status'] = 'ok';

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
