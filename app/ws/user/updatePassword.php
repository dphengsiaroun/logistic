<?php
	
	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/include/account.inc.php");
	
	
	$request = getRequest();

	$result = [];
	try {
		$account = new Account();
		if ($account->password != '' && $request->oldPassword != $account->password) {
			throw new Exception(ERROR_INCORRECT_OLD_PASSWORD_MSG, ERROR_INCORRECT_OLD_PASSWORD_CODE);
		}
		$account->password = $request->newPassword;
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
