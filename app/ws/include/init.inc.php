<?php
	require_once(BASE_DIR . '/vendor/autoload.php');

	// PHP Strict Mode !
	error_reporting(E_ERROR | E_WARNING | E_PARSE | E_NOTICE);

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
		$path = str_replace('\\', '/', $path);
		return getDomainUrl() . substr($path, strlen($_SERVER['DOCUMENT_ROOT']));
	}

	function getAppUrl() {
        return $_SERVER['HTTP_REFERER'];
    }
