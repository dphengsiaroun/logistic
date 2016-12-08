<?php
	
	define("BASE_DIR", dirname(dirname($_SERVER["SCRIPT_FILENAME"])));
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	session_start();
	debug("isConnected.php");
    debug_r('_SESSION', $_SESSION);
	
	// Permet de récuperer les données au format Json
	$postdata = file_get_contents("php://input");
	
	
	
    $id = default_str($_SESSION['id'], '');

	// On lance notre requête de vérification
	$sql = "SELECT * FROM account WHERE id='{$id}'";
	$sqlResult = $db->query($sql);

	// Si le résultat est différent de 0 alors on récupère les données 
	if ($sqlResult->rowCount() != 0) {
		$result = $sqlResult->fetch(PDO::FETCH_ASSOC); // On le transforme en tableau array

		debug_r("content", $result['content']);

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
