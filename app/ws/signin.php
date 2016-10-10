<?php

	echo '{"result":"ok"}';

	$host = 'localhost';
	$user = 'root';
	$mdp = 'root';
	$bdd = 'logistic';

	$connex = new mysqli($host, $user, $mdp, $bdd);

	$pseudo = $_POST['pseudo'];
	$mdp = $_POST['mdp'];

	$req = "SELECT * FROM membre WHERE pseudo='$pseudo' AND mdp='$mdp'";
	$lancereq = $connex->query($req);
  
   //Récupérer tous les détails de Angular HTTP Request  
    $postdata = file_get_contents ( "php: // input" ) ; 
    $request = json_decode ($postdata) ; 
    @ $login = $request->login ; 
    @ $passe = $request->password ; 
    echo $login ;

?>