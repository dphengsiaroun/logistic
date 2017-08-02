<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/class/User.php");

	$request = getRequest();
	debug("signup start");

	$result = [];
	try {
		if (User::exists($request->email)) {
			throw new Exception(ERROR_EMAIL_ALREADY_TAKEN_MSG, ERROR_EMAIL_ALREADY_TAKEN_CODE);
		}
		debug("user create start");
		$user = new User();
		$user->create();

		$result['status'] = 'ok';
		$result['user'] = $user;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
