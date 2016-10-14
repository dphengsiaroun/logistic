<?php
	
	define("BASE_DIR", ".");
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	session_start();
    debug_r('_SESSION', $_SESSION);
	
	// Permet de récuperer les données au format Json
	$postdata = file_get_contents("php://input");
	
	debug("start");
	
    $email = default_str($_SESSION['email'], '');

	// On lance notre requête de vérification
	$sql = "SELECT * FROM account WHERE email='{$email}'";
	$sqlResult = $db->query($sql);

	// Si le résultat est différent de 0 alors on récupère les données 
	if ($sqlResult->rowCount() != 0) {
		$result = $sqlResult->fetch(PDO::FETCH_ASSOC); // On le transforme en tableau array

		$result['status'] = 'ok';
		$result['content'] = json_decode($result['content']);
	} else {
		$result['status'] = 'ko';
		$result['errorMsg'] = ERROR_BAD_LOGIN_MSG;
		$result['errorCode'] = ERROR_BAD_LOGIN_CODE;
	}

	// On encode le tableau array en format json pour angular
	echo json_encode($result);
?>
