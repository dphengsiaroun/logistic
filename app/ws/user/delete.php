<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/class/User.php");

    $request = getRequest();
	debug("delete account", $request);

	$result = [];
	try {

		$account = User::getConnected();
		$account->delete();
		$result['status'] = 'ok';

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
