<?php
	
	define("BASE_DIR", dirname(dirname($_SERVER["SCRIPT_FILENAME"])));
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	session_start();
	
	// Permet de récuperer les données au format Json
	$postdata = file_get_contents("php://input");
	// on décode le json en variable PHP
    $request = json_decode($postdata);
	debug("start");
	debug_r("request", $request);

	// On lance notre requête de vérification
	$sql = "SELECT * FROM account WHERE email='{$request->email}' AND password ='{$request->password}'";
	$sqlResult = $db->query($sql);

	// Si le résultat est différent de 0 alors on récupère les données 
	if ($sqlResult->rowCount() != 0) {
		$result = $sqlResult->fetch(PDO::FETCH_ASSOC); // On le transforme en tableau array
		debug_r('signin result', $result);
		$result['status'] = 'ok';
		$result['content'] = json_decode($result['content']);
		$_SESSION['email'] = $request->email;
		$_SESSION['accountId'] = $result['id'];
		debug_r('signin session', $_SESSION);
	} else {
		$result['status'] = 'ko';
		$result['errorMsg'] = ERROR_BAD_LOGIN_MSG;
		$result['errorCode'] = ERROR_BAD_LOGIN_CODE;
	}

	// On encode le tableau array en format json pour angular
	echo json_encode($result);
?>
