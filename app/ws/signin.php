<?php
	
	define("BASE_DIR", ".");
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	session_start();
	
	// Permet de récuperer les données au format Json
	$postdata = file_get_contents("php://input");
	// on décode le json en variable PHP
    $request = json_decode($postdata); 

	// On récupère le login qu'on place dans une variable
	$pseudo = $request->login;
	// On récupère le password qu'on place dans une variable 
	$mdp = $request->password;

	// On lance notre requête de vérification
	$req = "SELECT * FROM membre WHERE pseudo='$pseudo' AND mdp ='$mdp'";
	$sqlResult = $db->query($req);

	// Si le résultat est différent de 0 alors on récupère les données 
	if ($sqlResult->rowCount() != 0) {
		$result = $sqlResult->fetch(PDO::FETCH_ASSOC); // On le transforme en tableau array

		$result['status'] = 'ok';
	} else {
		$result['status'] = 'ko';
		$result['errorMsg'] = ERROR_BAD_LOGIN_MSG;
		$result['errorCode'] = ERROR_BAD_LOGIN_CODE;
	}

	// On encode le tableau array en format json pour angular
	echo json_encode($result);
?>
