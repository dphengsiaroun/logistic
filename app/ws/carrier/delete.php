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
	$carrier = clone $request;
	debug_r("delete carrier ad", $carrier);

	$result = [];
	try {

		$sql = <<<EOF
DELETE FROM carrier
WHERE account_id = :account_id;
EOF;

		$st = $db->prepare($sql,
				array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':account_id' => $_SESSION['id']
		)) === FALSE) {
			throw new Exception('Cannot delete carrier ad : '.sprint_r($db->errorInfo()));
		}
		debug("delete carrier ad ok");
		$result['status'] = 'ok';

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
