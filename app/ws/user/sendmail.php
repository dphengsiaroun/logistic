<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/include/account.inc.php");
	require_once(BASE_DIR . "/include/mail.inc.php");


	$request = getRequest();

	$result = [];
	try {
		if (Account::exists($request->email)) {
			$account = Account::retrieveFromEmail($request->email);
			sendmail($account, $request->type);
		}

		$result['status'] = 'ok';

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
