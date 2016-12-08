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
	$adCarrier = clone $request;
	$adCarrier->content = json_encode($adCarrier->content);
	debug("adCarrier start");
	debug_r("ad carrier", $adCarrier);

	$result = [];
	try {

		$sql = "SELECT * FROM adcarrier";
		$sqlResult = $db->query($sql);
		debug_r("sqlResult", $sqlResult);
		
		$sql = <<<EOF
INSERT INTO adcarrier (content) VALUES 
	(:content); 
EOF;

		$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':content' => $adCarrier->content
		)) === FALSE) {
			throw new Exception('Table creation: '.sprint_r($db->errorInfo()));
		}
		
		$sql = <<<EOF
SELECT * FROM adcarrier
EOF; 

		//On lance la requête	
		$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':id' => $adCarrier->id
		)) === FALSE) {
			throw new Exception('Table interrogation: '.sprint_r($db->errorInfo()));
		}
		
		$array = $st->fetch(); // on transforme notre requete en tableau array
		$id = $array['id'];
		$result['status'] = 'ok';
		$request->id = $id;
		$result['adcarrier'] = $request;
		$_SESSION['ads'] = $request->email;
		$_SESSION['id'] = $request->id;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
