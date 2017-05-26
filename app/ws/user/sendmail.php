<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/class/User.php");
	require_once(BASE_DIR . "/include/mail.inc.php");


	$request = getRequest();

	$result = [];
	try {
		if (User::exists($request->email)) {
			$user = User::retrieveFromEmail($request->email);
			sendmail($user, $request->type);
		}

		$result['status'] = 'ok';

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
