<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/class/User.php");

    $request = getRequest();
	debug('sign in');

	$result = [];
	try {
		$account = User::signin($request->email, $request->password);

		$result['status'] = 'ok';
		$result['account'] = $account;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
