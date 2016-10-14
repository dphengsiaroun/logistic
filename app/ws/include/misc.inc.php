<?php

	// fonction qui permet de créer le fichier trace.log afin de verifier les données récuperer
	function debug($content) {
		file_put_contents('trace.log', $content . "\n", FILE_APPEND);
	}

	function sprint_r($var) {
		ob_start();
		print_r($var);
		$output=ob_get_contents();
		ob_end_clean();
		return $output;
	}

	function debug_r($msg, $content) {
		file_put_contents('trace.log', $msg . " " . sprint_r($content) . "\n", FILE_APPEND);
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


?>

