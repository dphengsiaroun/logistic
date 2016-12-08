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
	$carrier = clone $request;
	$carrier->content = json_encode($adCarrier->content);
	debug("Carrier start");
	debug_r("carrier", $carrier);

	$result = [];
	try {
		
		$sql = <<<EOF
INSERT INTO carrier (content, account_id) VALUES 
	(:content, :account_id); 
EOF;

		$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':content' => $carrier->content,
			':account_id' => $carrier->accountId
		)) === FALSE) {
			throw new Exception('Table creation: '.sprint_r($db->errorInfo()));
		}
		$lastId = $db->lastInsertId();

		$result['status'] = 'ok';
		$request->id = $id;
		$result['carrier'] = $request;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
