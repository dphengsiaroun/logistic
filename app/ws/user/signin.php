<?php
	
	define("BASE_DIR", dirname(dirname($_SERVER["SCRIPT_FILENAME"])));
	require_once(BASE_DIR . "/include/account.inc.php");
	
    $request = getRequest();
	debug('sign in');

	$result = [];
	try {
		$account = Account::signin($request->email, $request->password);
		
		$result['status'] = 'ok';
		$result['account'] = $account;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
