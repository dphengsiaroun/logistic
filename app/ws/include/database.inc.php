<?php
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(CONFIG_INI);

	try {
		$db = new PDO("mysql:host=$host;dbname=$bdd", $user, $mdp);
	} catch (Exception $e) {
		try {
			$db = new PDO("mysql:host=$host", $user, $mdp);
		} catch (Exception $e) {
			$result = array();
			$result['status'] = 'ko';
			$result['errorMsg'] = ERROR_MYSQL_CONNECT_MSG;
			$result['errorCode'] = ERROR_MYSQL_CONNECT_CODE;
			echo json_encode($result);
			exit;
		}
		
	}
	


?>

