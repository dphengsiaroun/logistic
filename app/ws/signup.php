<?php
	
	define("BASE_DIR", ".");
	require_once(BASE_DIR . "/include/misc.inc.php");
	
	// Permet de récuperer les données au format Json
	$postdata = file_get_contents("php://input");
	// on décode le json en variable PHP
    $request = json_decode($postdata); 

	// On récupère le login qu'on place dans une variable
	$pseudo = $request->login;
	// On récupère le password qu'on place dans une variable 
	$mdp = $request->password;
    $user = $request->password;

	// On lance notre requête de vérification
	$req = "SELECT * FROM membre WHERE pseudo='$pseudo' AND mdp ='$mdp'";
	$lancereq = $connex->query($req);

	// Si le résultat est différent de 0 alors on récupère les données 
	if ($lancereq->num_rows != 0) {
		$membre = $lancereq->fetch_assoc(); // On le transforme en tableau array
	}

	$membre['pseudo2'] = $pseudo;

	// On encode le tableau array en format json pour angular
	echo json_encode($membre);
?>
