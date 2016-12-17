<?php
	
	define("BASE_DIR", dirname(dirname($_SERVER["SCRIPT_FILENAME"])));
	require_once(BASE_DIR . "/include/account.inc.php");
	
    $request = getRequest();
	debug("delete account", $request);

	$result = [];
	try {

		$account = new Account();
		$account->delete();
		$result['status'] = 'ok';

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
