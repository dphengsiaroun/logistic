<?php
	
	define("BASE_DIR", ".");
	require_once(BASE_DIR . "/include/install.inc.php");
	session_start();
	
	// Permet de récuperer les données au format Json
	$postdata = file_get_contents("php://input");
	// on décode le json en variable PHP
    $request = json_decode($postdata); 

	createConfigIniFile($request);

	$result = array(
		"result" => "ok"
	);

	// On encode le tableau array en format json pour angular
	echo json_encode($result);
?>