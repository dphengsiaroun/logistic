<?php
	
	define("BASE_DIR", dirname(dirname($_SERVER["SCRIPT_FILENAME"])));
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	
	
	// Permet de récuperer les données au format Json
	$postdata = file_get_contents("php://input");

	// on décode le json dans une variable PHP
    $request = json_decode($postdata); 
	$truck = clone $request;
	debug("delete truck ad", $truck);

	$result = [];
	try {

		$sql = <<<EOF
DELETE FROM lg_truck
WHERE account_id = :account_id;
EOF;

		$st = $db->prepare($sql,
				array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':account_id' => $_COOKIE['accountId']
		)) === FALSE) {
			throw new Exception('Cannot delete truck ad : '.sprint_r($db->errorInfo()));
		}
		debug("delete truck ad ok");
		$result['status'] = 'ok';

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
