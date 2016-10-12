<?php
	$host = 'localhost';
	$user = 'root';
	$mdp = 'root';
	$bdd = 'logistic';

	$connex = new mysqli($host, $user, $mdp, $bdd);

	if($connex->connect_error)
	{
		die("Un problème est survenue lors de la tentative de connexion à la BDD " . $mysqli->connect_error);
	}