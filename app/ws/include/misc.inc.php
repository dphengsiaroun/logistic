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


?>

