<?php

	define('CONFIG_INI', BASE_DIR . '/include/config.ini');
	
	function isHttps() {
		$result = !empty($_SERVER['HTTPS']) && strcasecmp($_SERVER['HTTPS'], 'on') === 0 ||
			!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
			strcasecmp($_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') === 0;
		return $result;
	}
	
	function getDomainUrl() {
        
        return
            (isHttps() ? 'https://' : 'http://').
            (!empty($_SERVER['REMOTE_USER']) ? $_SERVER['REMOTE_USER'].'@' : '').
            (isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : ($_SERVER['SERVER_NAME'].
            ($https && $_SERVER['SERVER_PORT'] === 443 ||
            $_SERVER['SERVER_PORT'] === 80 ? '' : ':'.$_SERVER['SERVER_PORT'])));
    }
	
	function getUrlFromPath($path) {
		
		return getDomainUrl() . substr($path, strlen($_SERVER['DOCUMENT_ROOT']));
	}
	
	define('DOMAIN_URL', getDomainUrl());
	
	define('UPLOAD_DIR', dirname(dirname(BASE_DIR)) . '/files/');
	define('UPLOAD_URL', getUrlFromPath(UPLOAD_DIR));
	


	define('ERROR_TECHNICAL_CODE', 0);

	define('ERROR_BAD_LOGIN_CODE', 1);
	define('ERROR_BAD_LOGIN_MSG', 'login/password not found.');

	define('ERROR_BAD_PSEUDO_CODE', 2);
	define('ERROR_BAD_PSEUDO_MSG', 'pseudo already exists');

	
	define('ERROR_MYSQL_CONNECT_CODE', 3);
	define('ERROR_MYSQL_CONNECT_MSG', 'cannot connect to mysql (bad login password or database down)');

	
	
	
?>