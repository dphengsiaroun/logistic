<?php
	
	define("BASE_DIR", ".");
	require_once(BASE_DIR . "/include/misc.inc.php");
	session_start();
	

	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

	$pseudo = $request->login;
	$mdp = $request->password;

	$req = "SELECT * FROM membre WHERE pseudo='$pseudo' AND mdp ='$mdp'";
	$lancereq = $connex->query($req);

	if ($lancereq->num_rows != 0) {
		$membre = $lancereq->fetch_assoc();
	}

	$membre['pseudo2'] = $pseudo;
	$membre['post'] = $_POST;


	echo json_encode($membre);

?>