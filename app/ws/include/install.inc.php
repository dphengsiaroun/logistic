<?php

	function isConfigIniFileExisting() {
		return true;
	}

	function isDatabaseExisting() {
		return true;
	}

	// fonction qui permet de créer le fichier config.ini afin de verifier les données récuperer
	function createConfigIniFile($request) {
		$content = <<<EOF

			<?php
				
				\$host = '$request->hostname';
				\$user = '$request->username';
				\$mdp = '$request->password';
				\$bdd = '$request->databaseName';

			?>

EOF;
		file_put_contents(CONFIG_INI, $content);
		//chmod(CONFIG_INI, 0400);
	}

	function install($request) {
		try {
			debug("Starting to install: " . "mysql:host=$request->hostname");
			$db = new PDO("mysql:host={$request->hostname}", $request->username, $request->password);
			$sql = <<<EOF
CREATE DATABASE IF NOT EXISTS {$request->databaseName} DEFAULT CHARACTER SET = 'utf8';
USE {$request->databaseName};
EOF;
			
			debug($sql);
			if ($db->exec($sql) === FALSE) {
				throw new Exception("DB creation: " . sprint_r($db->errorInfo()));
			};
			debug("sql done");
			$db = new PDO("mysql:host={$request->hostname};dbname={$request->databaseName}", $request->username, $request->password);
			
			if ($request->dbCreation == 1) {
				$sql = file_get_contents("include/install.sql");
				//$requests = str_replace("ENGINE=InnoDB", "", $requests);
				$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
				if ($st->execute() === FALSE) {
					throw new Exception("Table creation: ".sprint_r($db->errorInfo())." InnoDB?");
				}
			}
		} catch (Exception $e) {
			throw $e;
		}
	}




?>

