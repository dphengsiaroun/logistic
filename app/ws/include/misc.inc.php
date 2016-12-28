<?php

	session_start();


	$log = new Monolog\Logger('log');
	$stream = new Monolog\Handler\StreamHandler(TRACE_LOG, TRACE_LEVEL);
	$format = "[%datetime%] %channel%.%level_name%: %message% \n";
	$formatter = new Monolog\Formatter\LineFormatter($format, null, true);
	$stream->setFormatter($formatter);
	$log->pushHandler($stream);

	// fonction qui permet de créer le fichier trace.log afin de verifier les données récuperer
	function debug($msg, $object = NULL) {
		global $log;
		if ($object == NULL) {
			$log->addDebug($msg);
			return;
		}
		$log->addDebug($msg . " " . sprint_r($object));
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


?>

