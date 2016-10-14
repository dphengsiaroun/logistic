<?php

	// fonction qui permet de créer le fichier trace.log afin de verifier les données récuperer
	function debug($content) {
		file_put_contents('trace.log', $content . "\n", FILE_APPEND);
	}


?>

