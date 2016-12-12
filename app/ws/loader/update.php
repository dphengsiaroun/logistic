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
	$loader = clone $request;
	$loader->content = json_encode($loader->content);
	debug("Loader start");
	debug_r("loader", $loader);

	$result = [];
	try {

		// On lance notre requête de vérification
		$sql = "SELECT * FROM loader WHERE account_id='$request->id'";
		$sqlResult = $db->query($sql);
		debug_r("sqlResult", $sqlResult);
		
		$sql = <<<EOF
UPDATE loader
SET :content
WHERE account_id = :account_id;
EOF;

		$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':content' => $loader->content,
			':account_id' => $_SESSION['id']
		)) === FALSE) {
			throw new Exception('Table creation: '.sprint_r($db->errorInfo()));
		}

		$result['status'] = 'ok';
		$result['loader'] = $request;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
