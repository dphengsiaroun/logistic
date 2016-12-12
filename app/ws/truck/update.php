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
	$truck = clone $request;
	$truck->content = json_encode($truck->content);
	debug("Truck start");
	debug_r("truck", $truck);

	$result = [];
	try {

		// On lance notre requête de vérification
		$sql = "SELECT * FROM truck WHERE account_id='$request->id'";
		$sqlResult = $db->query($sql);
		debug_r("sqlResult", $sqlResult);
		
		$sql = <<<EOF
UPDATE truck
SET :content
WHERE account_id = :account_id;
EOF;

		$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':content' => $truck->content,
			':account_id' => $_SESSION['id']
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
