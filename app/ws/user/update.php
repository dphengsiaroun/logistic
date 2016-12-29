<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/include/account.inc.php");

    $request = getRequest();
	$result = [];
	try {
		$account = Account::getConnected();
		$account->email = $request->email;
		$account->content = $request->content;
		$account->save();
		$result['status'] = 'ok';
		$result['account'] = $account;
	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
