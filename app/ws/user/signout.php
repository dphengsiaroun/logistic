<?php
	
	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/class/Account.php");
	
	
    $result = [];
    $result['status'] = 'ok';
	Account::signout();
	
	

	// On encode le tableau array en format json pour angular
	echo json_encode($result);
?>
