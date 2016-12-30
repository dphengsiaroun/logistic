<?php

	require_once(BASE_DIR . '/include/init.inc.php');
	define('CONFIG_INI', BASE_DIR . '/include/config.ini');

	define('TRACE_LOG', BASE_DIR . '/_trace.log');
	define('TRACE_LEVEL', Monolog\Logger::DEBUG);

	define('SECRET', 'This is a secret...#&@!');


	define('DOMAIN_URL', getDomainUrl());

	define('UPLOAD_DIR', dirname(BASE_DIR) . '/files/');
	define('UPLOAD_URL', getUrlFromPath(UPLOAD_DIR));

	// 20 Mega par personne d'image max.
	define('MAX_PICTURE_SIZE_PER_ACCOUNT', 20000000);

	define('ERROR_TECHNICAL_CODE', 0);

	define('ERROR_BAD_LOGIN_CODE', 1);
	define('ERROR_BAD_LOGIN_MSG', 'login/password not found.');

	define('ERROR_BAD_PSEUDO_CODE', 2);
	define('ERROR_BAD_PSEUDO_MSG', 'pseudo already exists');

	define('ERROR_MYSQL_CONNECT_CODE', 3);
	define('ERROR_MYSQL_CONNECT_MSG', 'cannot connect to mysql (bad login password or database down)');

	define('ERROR_EMAIL_ALREADY_TAKEN_CODE', 4);
	define('ERROR_EMAIL_ALREADY_TAKEN_MSG', 'Email already taken');

	define('ERROR_NEED_AUTHENTICATION_CODE', 5);
	define('ERROR_NEED_AUTHENTICATION_MSG', 'Need to be identified.');

	define('ERROR_MAX_SIZE_EXCEEDED_CODE', 6);
	define('ERROR_MAX_SIZE_EXCEEDED_MSG', 'Too much pictures loaded.');

	define('ERROR_INCORRECT_OLD_PASSWORD_CODE', 7);
	define('ERROR_INCORRECT_OLD_PASSWORD_MSG', 'Incorrect old password.');

	define('ERROR_BAD_REACTIVATION_CODE_CODE', 8);
	define('ERROR_BAD_REACTIVATION_CODE_MSG', 'Bad reactivation code.');
