<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/include/account.inc.php");

    debug('isConnected');

	$result = [];
	try {
		$account = Account::getConnected();
		$result['status'] = 'ok';
		$result['account'] = $account;
	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
