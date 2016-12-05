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
	$account = clone $request;
	$account->content = json_encode($account->content);


	$result = [];
	try {

		// Si le résultat est différent de 0 alors on récupère les données 
		if ($sqlResult->rowCount() != 0) {
			throw new Exception(ERROR_BAD_PSEUDO_MSG, ERROR_BAD_PSEUDO_CODE);
		} 
		
		$sql = <<<EOF
UPDATE account
SET email = ':email', password = ':password', content = ':content'
WHERE email = '$request->email'
EOF;

		$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':email' => $account->email,
			':password' => $account->password,
			':content' => $account->content
		)) === FALSE) {
			throw new Exception("Table creation: ".sprint_r($db->errorInfo()));
		}
		$result['status'] = 'ok';
		$result['account'] = $request;
		$_SESSION['email'] = $request->email;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
