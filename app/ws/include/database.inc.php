<?php
	require_once(BASE_DIR . "/include/constant.inc.php");

	try {
		$db = new PDO("mysql:host=$host;dbname=$bdd", 
			$user,
			$mdp,
			array(
				PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
			)
		);
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

