<?php
	
	define("BASE_DIR", dirname(dirname($_SERVER["SCRIPT_FILENAME"])));
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	session_start();
	
	// Permet de récuperer les données au format Json
	$postdata = file_get_contents("php://input");

	// on décode le json dans une variable PHP
    $request = json_decode($postdata); 
	$account = clone $request;
	$account->content = json_encode($account->content);

	$result = [];
	try {
				// On lance notre requête de vérification
		$sql = "SELECT * FROM account WHERE email='$request->email'";
		$sqlResult = $db->query($sql);
		debug_r("sqlResult", $sqlResult);

		$sql = <<<EOF
UPDATE account SET password = :password WHERE id = :id;
EOF;

	$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':email' => $account->email,
			':password' => $account->password,
		)) === FALSE) {
			throw new Exception('Table creation: '.sprint_r($db->errorInfo()));
		}

		$sql = <<<EOF
SELECT * FROM account WHERE email=:email
EOF;
		
		$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':email' => $account->email
		)) === FALSE) {
			throw new Exception('Table interrogation: '.sprint_r($db->errorInfo()));
		}
		
		$array = $st->fetch();
		$id = $array['id'];
		$result['status'] = 'ok';
		$request->id = $id;
		$result['account'] = $request;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
