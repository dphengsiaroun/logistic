<?php
	
	define("BASE_DIR", ".");
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	
	// Permet de récuperer les données au format Json
	$postdata = file_get_contents("php://input");
	// on décode le json en variable PHP
    $request = json_decode($postdata); 

	// On récupère les données qu'on place dans une variable
	$pseudo = $request->login;
	$mdp = $request->password;
    $lastname = $request->nom;
	$firstname = $request->prenom;
	$email = $request->email;
	$address = $request->address;
	$zipcode = $request->zipcode;
	$city = $request->city;
	$country = $request->country;

	// On lance notre requête de vérification
	$req = "SELECT * FROM membre WHERE pseudo='$pseudo'";
	$sqlResult = $connex->query($req);

	// Si le résultat est différent de 0 alors on récupère les données 
	if ($sqlResult->num_rows != 0) {
		$result['status'] = 'ko';
		$result['errorMsg'] = ERROR_BAD_PSEUDO_MSG;
		$result['errorCode'] = ERROR_BAD_LOGIN_CODE;
	} else {
		$result['status'] = 'ok';
		//$req = "INSERT INTO membre (pseudo, mdp, nom, prenom, email, adresse, cp, ville) VALUES('$pseudo', '$mdp', '$nom', '$prenom', '$email', '$adresse', '$cp', '$ville')";
		//$sqlResult = $connex->query($req);
	}

	// On encode le tableau array en format json pour angular
	echo json_encode($result);
?>
