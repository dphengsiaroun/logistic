<?php
	
	define("BASE_DIR", dirname(dirname($_SERVER["SCRIPT_FILENAME"])));
	require_once(BASE_DIR . "/include/account.inc.php");
	
	$request = getRequest(); 
	debug("signup start");

	$result = [];
	try {
		if (Account::exists($request->email)) {
			throw new Exception(ERROR_EMAIL_ALREADY_TAKEN_MSG, ERROR_EMAIL_ALREADY_TAKEN_CODE);
		}
		
		//TODO: faire pareil pour les pseudos (rendre possible de se logguer de differente facon (pseudo, email, tel, etc.)
		$account = new Account($request);
		
		$result['status'] = 'ok';
		$result['account'] = $account;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
