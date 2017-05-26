<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/class/User.php");

    $request = getRequest();
	debug('sign in with code', $request);

	$result = [];
	try {
		$user = User::retrieveFromCode($request->id, $request->code);

		$result['status'] = 'ok';
		$result['user'] = $user;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
