<?php
	require_once(BASE_DIR . '/include/constant.inc.php');
	include_once(CONFIG_INI);

	try {
		$db = new PDO("mysql:host={$cfg->host};port={$cfg->port};dbname={$cfg->database}",
			$cfg->user,
			$cfg->password,
			array(
				PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
				PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
			)
		);
	} catch (Exception $e) {
		try {
			$db = new PDO("mysql:host={$cfg->host}", $cfg->user, $cfg->password);
		} catch (Exception $e) {
			$result = array();
			$result['status'] = 'ko';
			$result['errorMsg'] = ERROR_MYSQL_CONNECT_MSG;
			$result['errorCode'] = ERROR_MYSQL_CONNECT_CODE;
			echo json_encode($result);
			exit;
		}

	}

