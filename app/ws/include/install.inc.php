<?php

	function getObj() {
		$configLog = str_replace(".ini", ".log", CONFIG_INI);
		debug('$configLog', $configLog);
		$result = array(
			'hostname' => 'localhost',
			'username' => 'root',
			'password' => '',
			'databaseName' => 'logistic',
			'oauth2' => array(
				'google' => array(
					'clientID' => 'TBD1',
					'clientSecret' => 'TBD2',
				),
				'facebook' => array(
					'clientID' => 'TBD3',
					'clientSecret' => 'TBD4',
				),	
			),
		);
		if (file_exists($configLog)) {
			require_once($configLog);

			$result['appName'] = $cfg->appName;

			$result['password'] = $cfg->mdp;

			$result['oauth2']['google']['clientID'] = $cfg->oauth2GoogleClientId;
			$result['oauth2']['google']['clientSecret'] = $cfg->oauth2GoogleClientSecret;
			$result['oauth2']['facebook']['clientID'] = $cfg->oauth2FacebookClientId;
			$result['oauth2']['facebook']['clientSecret'] = $cfg->oauth2FacebookClientSecret;

			$result['smtp']['host'] = $cfg->smtpServerHost;
			$result['smtp']['port'] = $cfg->smtpServerPort;
			$result['smtp']['username'] = $cfg->smtpServerUsername;
			$result['smtp']['password'] = $cfg->smtpServerPassword;
			$result['smtp']['from'] = $cfg->smtpServerFrom;
			
		}
		return $result;
	}

	function isConfigIniFileExisting() {
		global $cfg;
		return isset($cfg);
	}

	function isDatabaseExisting() {
		global $cfg, $db;
		$bdd = $cfg->bdd;
		$sql = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$bdd'";
		$sqlResult = $db->query($sql);

		// Si le résultat est différent de 0 alors on récupère les données 
		return ($sqlResult->rowCount() != 0);
	}

	// fonction qui permet de créer le fichier config.ini afin de verifier les données récuperer
	function createConfigIniFile($request) {
		debug('request', $request);
		debug('request', $request->oauth2->google->clientID);
		debug('done');
		$content = <<<EOF
<?php

	\$cfg = new stdClass();
	\$cfg->appName = '$request->appName';
	
	\$cfg->host = '$request->hostname';
	\$cfg->user = '$request->username';
	\$cfg->mdp = '$request->password';
	\$cfg->bdd = '$request->databaseName';

	\$cfg->oauth2GoogleClientId = '{$request->oauth2->google->clientID}';
	\$cfg->oauth2GoogleClientSecret = '{$request->oauth2->google->clientSecret}';

	\$cfg->oauth2FacebookClientId = '{$request->oauth2->facebook->clientID}';
	\$cfg->oauth2FacebookClientSecret = '{$request->oauth2->facebook->clientSecret}';

	\$cfg->smtpServerHost = '{$request->smtp->host}';
	\$cfg->smtpServerPort = '{$request->smtp->port}';
	\$cfg->smtpServerUsername = '{$request->smtp->username}';
	\$cfg->smtpServerPassword = '{$request->smtp->password}';
	\$cfg->smtpServerFrom = '{$request->smtp->from}';


EOF;
		file_put_contents(CONFIG_INI, $content);
		//chmod(CONFIG_INI, 0400);
	}

	function installDatabase($request) {
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
				$sql = file_get_contents(BASE_DIR . "/include/install.sql");
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

	function removeDatabase() {
		global $cfg, $db;
		
		$sql = <<<EOF
DROP DATABASE IF EXISTS {$cfg->bdd};
EOF;
		$st = $db->prepare($sql,
			array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute() === FALSE) {
			throw new Exception("Table creation: ".sprint_r($db->errorInfo())." InnoDB?");
		}
	}

	function removeConfigIniFile() {
		unlink(CONFIG_INI);
	}

