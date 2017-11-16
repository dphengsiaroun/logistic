<?php

namespace JLG;

class Misc {
    public static function isHttps() {
		$result = !empty($_SERVER['HTTPS']) && strcasecmp($_SERVER['HTTPS'], 'on') === 0 ||
			!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
			strcasecmp($_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') === 0;
		return $result;
	}

	public static function getDomainUrl() {
		echo 'tete';
        return
            (self::isHttps() ? 'https://' : 'http://').
            (!empty($_SERVER['REMOTE_USER']) ? $_SERVER['REMOTE_USER'].'@' : '').
            (isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : ($_SERVER['SERVER_NAME'].
            ($https && $_SERVER['SERVER_PORT'] === 443 ||
            $_SERVER['SERVER_PORT'] === 80 ? '' : ':'.$_SERVER['SERVER_PORT'])));
    }

	public static function getUrlFromPath($path) {
		echo 'titi';
		$path = str_replace('\\', '/', $path);
		return self::getDomainUrl() . substr($path, strlen($_SERVER['DOCUMENT_ROOT']));
	}
}