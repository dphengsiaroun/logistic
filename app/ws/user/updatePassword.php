<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/class/User.php");


	$request = getRequest();

	$result = [];
	try {
		$user = NULL;
		if (property_exists($request, 'id') && property_exists($request, 'code')) {
			$user = User::retrieveFromCode($request->id, $request->code);
		} else {
			$user = User::getConnected();
			if ($user->password != '' && $request->oldPassword != $user->password) {
				throw new Exception(ERROR_INCORRECT_OLD_PASSWORD_MSG, ERROR_INCORRECT_OLD_PASSWORD_CODE);
			}
		}

		$user->password = $request->newPassword;
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
