<?php
	
	define("BASE_DIR", dirname(dirname($_SERVER["SCRIPT_FILENAME"])));
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	
	
	// Permet de récuperer les données au format Json
	$postdata = file_get_contents("php://input");

	// on décode le json dans une variable PHP
    $request = json_decode($postdata); 
	$loader = clone $request;
	debug("delete loader ad", $loader);

	$result = [];
	try {

		$sql = <<<EOF
DELETE FROM loader
WHERE account_id = :account_id;
EOF;

		$st = $db->prepare($sql,
				array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':account_id' => $_SESSION['id']
		)) === FALSE) {
			throw new Exception('Cannot delete loader ad : '.sprint_r($db->errorInfo()));
		}
		debug("delete loader ad ok");
		$result['status'] = 'ok';

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
