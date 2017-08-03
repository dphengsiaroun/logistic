<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/class/User.php");

    $request = getRequest();
	debug("delete user", $request);

	$result = [];
	try {

		$user = new User();
		debug('delete send');
		$user = $user->delete();
		
		$result['status'] = 'ok';
		debug('delete finished');

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
