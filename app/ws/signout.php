<?php
	
	define("BASE_DIR", ".");
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	session_start();
	
    $result = [];
    $result['status'] = 'ok';
    unset($_SESSION['email']);

	// On encode le tableau array en format json pour angular
	echo json_encode($result);
?>
