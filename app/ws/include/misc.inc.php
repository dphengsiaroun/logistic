<?php
	require_once("config.ini");

	$connex = new mysqli($host, $user, $mdp, $bdd);

	if($connex->connect_error)
	{
		die("Un problème est survenue lors de la tentative de connexion à la BDD " . $mysqli->connect_error);
	}

	// fonction qui permet de créer le fichier trace.log afin de verifier les données récuperer
	function jlgLog($content) {
		file_put_contents('trace.log', $content . "\n", FILE_APPEND);
	}

?>

