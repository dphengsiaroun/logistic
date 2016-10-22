<?php

	define('CONFIG_INI', BASE_DIR . '/include/config.ini');

	define('ERROR_TECHNICAL_CODE', 0);

	define('ERROR_BAD_LOGIN_CODE', 1);
	define('ERROR_BAD_LOGIN_MSG', 'login/password not found.');

	define('ERROR_BAD_PSEUDO_CODE', 2);
	define('ERROR_BAD_PSEUDO_MSG', 'pseudo already exists');

	
	define('ERROR_MYSQL_CONNECT_CODE', 3);
	define('ERROR_MYSQL_CONNECT_MSG', 'cannot connect to mysql (bad login password or database down)');

	
	
?>