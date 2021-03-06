<?php

	require_once(BASE_DIR . '/include/init.inc.php');
	require_once(BASE_DIR . '/include/settings.inc.php');
	define('CONFIG_INI', BASE_DIR . '/include/config.ini');
	define('SUGGESTED_CONFIG_PHP', BASE_DIR . '/include/suggested.config.php');


	define('TRACE_LOG', BASE_DIR . '/logs/_trace.log');
	define('TEST_MAIL_FORGOTTEN_PASSWORD', BASE_DIR . '/logs/temp-mail-password.log');

	define('SECRET', 'This is a secret...#&@!');


	define('DOMAIN_URL', getDomainUrl());

	define('UPLOAD_DIR', dirname(BASE_DIR) . '/files/');
	define('UPLOAD_URL', 'files/');

	define('INSTALL_DIR', dirname(BASE_DIR) . '/install/');	

	// 100 Mega par personne d'image max.
	define('MAX_PICTURE_SIZE_PER_ACCOUNT', 100000000);
	// 10 Mega par personne anonyme d'image max.
	define('MAX_PICTURE_SIZE_PER_ANONYMOUS_SESSION', 10000000);

	define('FORGOTTEN_PASSWORD_EXPIRED_DELAY', (24 * 3600));


	define('ERROR_TECHNICAL_CODE', 0);

	define('ERROR_BAD_LOGIN_CODE', 1);
	define('ERROR_BAD_LOGIN_MSG', 'login/password not found.');

	define('ERROR_LOGIN_ALREADY_EXISTS_CODE', 2);
	define('ERROR_LOGIN_ALREADY_EXISTS_MSG', 'login already exists');

	define('ERROR_MYSQL_CONNECT_CODE', 3);
	define('ERROR_MYSQL_CONNECT_MSG', 'cannot connect to mysql (bad login password or database down)');

	define('ERROR_EMAIL_ALREADY_EXISTS_CODE', 4);
	define('ERROR_EMAIL_ALREADY_EXISTS_MSG', 'Email already taken');

	define('ERROR_PHONE_ALREADY_EXISTS_CODE', 41);
	define('ERROR_PHONE_ALREADY_EXISTS_MSG', 'Phone already taken');

	define('ERROR_NEED_AUTHENTICATION_CODE', 5);
	define('ERROR_NEED_AUTHENTICATION_MSG', 'Need to be identified.');

	define('ERROR_MAX_SIZE_EXCEEDED_CODE', 6);
	define('ERROR_MAX_SIZE_EXCEEDED_MSG', 'Too much pictures loaded.');

	define('ERROR_INCORRECT_OLD_PASSWORD_CODE', 7);
	define('ERROR_INCORRECT_OLD_PASSWORD_MSG', 'Incorrect old password.');

	define('ERROR_BAD_REACTIVATION_CODE_CODE', 8);
	define('ERROR_BAD_REACTIVATION_CODE_MSG', 'Bad reactivation code.');

	define('ERROR_EXPIRED_REACTIVATION_CODE_CODE', 9);
	define('ERROR_EXPIRED_REACTIVATION_CODE_MSG', 'Expired reactivation code.');

	define('ERROR_MISSING_TRUCK_NAME_CODE', 10);
	define('ERROR_MISSING_TRUCK_NAME_MSG', 'Missing truck name.');

	define('ERROR_CANNOT_GET_ROUTE_CODE', 11);
	define('ERROR_CANNOT_GET_ROUTE_MSG', 'Cannot get route. External API not working');

	define('ERROR_MISSING_PROPOSAL_NAME_CODE', 12);
	define('ERROR_MISSING_PROPOSAL_NAME_MSG', 'Missing proposal name.');

	define('ERROR_NO_PATCH_METHOD_CODE', 13);
	define('ERROR_NO_PATCH_METHOD_MSG', 'No patch method supported for this resource.');

