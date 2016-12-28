<?php
	
	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	
	
    $result = [];
    $result['status'] = 'ok';
	unset($_SESSION['id']);

	// On encode le tableau array en format json pour angular
	echo json_encode($result);
?>
