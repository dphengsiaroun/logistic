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
	debug_r("delete account", $account);

	$result = [];
	try {

		$sql = <<<EOF
DELETE FROM account
WHERE id = :id;
EOF;

		$st = $db->prepare($sql,
				array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':id' => $account->id,
		)) === FALSE) {
			throw new Exception('Cannot delete account : '.sprint_r($db->errorInfo()));
		}
		unset($_SESSION['id']);
		debug("delete account ok");
		$result['status'] = 'ok';

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
