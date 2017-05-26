<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/class/User.php");

    $request = getRequest();
	$result = [];
	try {
		$user = User::getConnected();
		$user->email = $request->email;
		$user->content = $request->content;
		$user->save();
		$result['status'] = 'ok';
		$result['user'] = $user;
	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
