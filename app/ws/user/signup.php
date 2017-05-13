<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/class/Account.php");

	$request = getRequest();
	debug("signup start");

	$result = [];
	try {
		if (Account::exists($request->email)) {
			throw new Exception(ERROR_EMAIL_ALREADY_TAKEN_MSG, ERROR_EMAIL_ALREADY_TAKEN_CODE);
		}

		$account = Account::create($request);

		$result['status'] = 'ok';
		$result['account'] = $account;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
