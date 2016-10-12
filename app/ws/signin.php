<?php

	//echo '{"result":"ok"}';
	require_once("config.php");

	$pseudo = $_POST['signinData.login'];
	$mdp = hash('sha256', $_POST['signinData.password']);

	$req = "SELECT * FROM membre WHERE pseudo='$pseudo' AND mdp ='$mdp'";
	$lancereq = $connex->query($req);

	if($lancereq->num_rows != 0)
	{
		$membre = $lancereq->fetch_assoc();
	}

	echo json_encode($membre);

?>