<?php


	// fonction qui permet de créer le fichier trace.log afin de verifier les données récuperer
	function createConfigIniFile($request) {
		$content = <<<EOF
<?php
	
	\$host = '$request->hostname';
	\$user = '$request->username';
	\$mdp = '$request->password';
	\$bdd = '$request->databaseName';

?>



EOF;
		file_put_contents('include/config.ini', $content);
	}

?>

