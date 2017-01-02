<?php
	require_once(BASE_DIR . '/include/constant.inc.php');
	include_once(CONFIG_INI);

	try {
		$db = new PDO("mysql:host={$cfg->host};dbname={$cfg->bdd}",
			$cfg->user,
			$cfg->mdp,
			array(
				PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
			)
		);
	} catch (Exception $e) {
		try {
			$db = new PDO("mysql:host={$cfg->host}", $cfg->user, $cfg->mdp);
		} catch (Exception $e) {
			$result = array();
			$result['status'] = 'ko';
			$result['errorMsg'] = ERROR_MYSQL_CONNECT_MSG;
			$result['errorCode'] = ERROR_MYSQL_CONNECT_CODE;
			echo json_encode($result);
			exit;
		}

	}

