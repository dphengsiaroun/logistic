<?php
	
	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/class/Account.php");
	
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
