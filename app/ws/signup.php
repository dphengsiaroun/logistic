<?php
	
	define("BASE_DIR", ".");
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	
	// Permet de récuperer les données au format Json
	$postdata = file_get_contents("php://input");
	// on décode le json en variable PHP
    $request = json_decode($postdata); 

	$result = [];
	try {
		// On récupère les données qu'on place dans une variable
		$login = $request->login;
		$password = $request->password;
		$lastname = $request->lastname;
		$firstname = $request->firstname;
		$email = $request->email;
		$address = $request->address;
		$zipcode = $request->zipcode;
		$city = 'Torcy';
		$country = 'France';

		// On lance notre requête de vérification
		$sql = "SELECT * FROM membre WHERE pseudo='$login'";
		$sqlResult = $db->query($sql);
		debug_r("sqlResult", $sqlResult);

		// Si le résultat est différent de 0 alors on récupère les données 
		if ($sqlResult->rowCount() != 0) {
			throw new Exception(ERROR_BAD_PSEUDO_MSG, ERROR_BAD_PSEUDO_CODE);
		} 
		
		$sql = <<<EOF
INSERT INTO membre (pseudo, mdp, nom, prenom, email, adresse, cp, ville) VALUES 
	('$login', '$password', '$lastname', '$firstname', '$email', '$address', '$zipcode', '$city')
EOF;

		$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute() === FALSE) {
			throw new Exception("Table creation: ".sprint_r($db->errorInfo()));
		}
		$result['status'] = 'ok';

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
