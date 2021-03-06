<?php

	session_start();

	require_once(BASE_DIR . "/include/constant.inc.php");


	$log = new Monolog\Logger('log');
	$stream = new Monolog\Handler\RotatingFileHandler(TRACE_LOG, 30, TRACE_LEVEL);
	$format = "[%datetime%] %channel%.%level_name%: %message% \n";
	$formatter = new Monolog\Formatter\LineFormatter($format, null, true);
	$stream->setFormatter($formatter);
	$log->pushHandler($stream);

	// fonction qui permet de créer le fichier trace.log afin de verifier les données récuperer
	function debug($msg, $object = NULL) {
		global $log;
		$e = new Exception("");
		$traces = $e->getTrace();
		$line = $traces[0]['line'];
		$filename = $traces[0]['file'];
		$message = $filename . ':' . $line . ":\n" . $msg;
		if ($object == NULL) {
			$log->addDebug($message);
			return;
		}
		$log->addDebug($message . " " . sprint_r($object));
	}

	function sprint_r($var) {
		ob_start();
		print_r($var);
		$output=ob_get_contents();
		ob_end_clean();
		return $output;
	}

	function is_null_or_empty(&$var) {
		if (!isset($var)) {
			return TRUE;
		}
		if ($var == NULL) {
			return TRUE;
		}
		if ($var == "") {
			return TRUE;
		}
		return FALSE;
	}

	function default_str(&$val1, $val2) {
		if (is_null_or_empty($val1)) {
			return $val2;
		}
		return $val1;
	}

	function initAttr(&$object, $key) {
		$array = (array)$object;
		if (array_key_exists($key, $array)) {
			return;
		}

		$array[$key] = NULL;
		$object = (object)$array;
	}

	function getRequest() {
		// Permet de récuperer les données au format Json
		$postdata = file_get_contents("php://input");
		// on décode le json dans une variable PHP
		$result = json_decode($postdata);
		debug('request', $result);
		return $result;
	}

	function getUrlQueryString() {
		$qs = $_SERVER['QUERY_STRING'];
		$result = array();
		parse_str($qs, $result);
		$result = (object) $result;
		return $result;
	}

	function getTemplate($file, $user = NULL, $context = NULL) {
		ob_start();
		require($file);
		$result = ob_get_contents();
		ob_end_clean();
		return $result;
	}

	function html2txt($html) {
		$result = $html;
		return $result;
	}

	function getAppUrl() {
		global $cfg;
	
		$result = $cfg->appUrl;

        return $result;
    }

	function str2spinal($str) {
		$result = preg_replace('/\s+/', '-', strtolower($str));
		$result = preg_replace('/[^a-z\-0-9]/', '', $result);
		return $result;
	}

	function startsWith($haystack, $needle) {
		$length = strlen($needle);
		return (substr($haystack, 0, $length) === $needle);
	}

	function endsWith($haystack, $needle) {
		$length = strlen($needle);
		if ($length == 0) {
			return true;
		}

    	return (substr($haystack, -$length) === $needle);
	}

