<?php
	
	define("BASE_DIR", dirname(dirname($_SERVER["SCRIPT_FILENAME"])));
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	
	
	// Permet de récuperer les données au format Json
	$postdata = file_get_contents("php://input");
	// on décode le json en variable PHP
    $request = json_decode($postdata);
	$truck = clone $request;
	
	$truck->content = json_encode($truck->content);
	debug("Truck start");
	debug("truck", $truck);
	debug('$request->id', $request->id);

	$result = [];
	try {

		// On lance notre requête de vérification
		$sql = "SELECT * FROM lg_truck WHERE account_id='$request->id'";
		$sqlResult = $db->query($sql);
		debug("sqlResult", $sqlResult);
		
		$sql = <<<EOF
UPDATE lg_truck
SET :content
WHERE account_id = :account_id;
EOF;

		$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':content' => $truck->content,
			':account_id' => $_COOKIE['accountId']
		)) === FALSE) {
			throw new Exception('Table creation: '.sprint_r($db->errorInfo()));
		}

		$result['status'] = 'ok';
		$result['truck'] = $request;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
