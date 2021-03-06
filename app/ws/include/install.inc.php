<?php

	function getObj() {
		debug('$configLog', SUGGESTED_CONFIG_PHP);
		$result = array(
			'hostname' => 'localhost',
			'username' => 'root',
			'password' => '',
			'databaseName' => 'logistic',
			'prefix' => 'lg_',
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
		if (file_exists(SUGGESTED_CONFIG_PHP)) {
			require_once(SUGGESTED_CONFIG_PHP);

			$result['appName'] = $cfg->appName;

			$result['hostname'] = $cfg->host;
			$result['port'] = $cfg->port;
			$result['username'] = $cfg->user;
			$result['password'] = $cfg->password;
			$result['databaseName'] = $cfg->database;
			$result['prefix'] = $cfg->prefix;

			$result['adminLogin'] = $cfg->adminLogin;
			$result['adminPassword'] = $cfg->adminPassword;

			$result['oauth2']['google']['clientID'] = $cfg->oauth2GoogleClientId;
			$result['oauth2']['google']['clientSecret'] = $cfg->oauth2GoogleClientSecret;
			$result['oauth2']['facebook']['clientID'] = $cfg->oauth2FacebookClientId;
			$result['oauth2']['facebook']['clientSecret'] = $cfg->oauth2FacebookClientSecret;

			$result['smtp']['host'] = $cfg->smtpServerHost;
			$result['smtp']['port'] = $cfg->smtpServerPort;
			$result['smtp']['secure'] = $cfg->smtpSecure;
			$result['smtp']['username'] = $cfg->smtpServerUsername;
			$result['smtp']['password'] = $cfg->smtpServerPassword;
			$result['smtp']['from'] = $cfg->smtpServerFrom;

			$result['routeGoogleAPIKey'] = $cfg->routeGoogleAPIKey;

		}
		return $result;
	}

	function isConfigIniFileExisting() {
		global $cfg;
		return isset($cfg);
	}

	function isDatabaseExisting() {
		global $cfg, $db;
		$database = $cfg->database;
		$sql = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$database'";
		$sqlResult = $db->query($sql);

		// Si le résultat est différent de 0 alors on récupère les données
		return ($sqlResult->rowCount() != 0);
	}

	// fonction qui permet de créer le fichier config.ini afin de verifier les données récuperer
	function createConfigIniFile($request) {
		debug('request', $request);
		debug('request', $request->oauth2->google->clientID);
		debug('done');
		$appUrl = dirname($request->appUrl);
		$content = <<<EOF
<?php

	\$cfg = new stdClass();
	\$cfg->appName = '$request->appName';

	\$cfg->host = '$request->hostname';
	\$cfg->port = '$request->port';
	\$cfg->user = '$request->username';
	\$cfg->password = '$request->password';
	\$cfg->database = '$request->databaseName';
	\$cfg->prefix = '$request->prefix';

	\$cfg->adminLogin = '$request->adminLogin';
	\$cfg->adminPassword = '$request->adminPassword';

	\$cfg->oauth2GoogleClientId = '{$request->oauth2->google->clientID}';
	\$cfg->oauth2GoogleClientSecret = '{$request->oauth2->google->clientSecret}';

	\$cfg->oauth2FacebookClientId = '{$request->oauth2->facebook->clientID}';
	\$cfg->oauth2FacebookClientSecret = '{$request->oauth2->facebook->clientSecret}';

	\$cfg->smtpServerHost = '{$request->smtp->host}';
	\$cfg->smtpServerPort = '{$request->smtp->port}';
	\$cfg->smtpSecure = '{$request->smtp->secure}';
	\$cfg->smtpServerUsername = '{$request->smtp->username}';
	\$cfg->smtpServerPassword = '{$request->smtp->password}';
	\$cfg->smtpServerFrom = '{$request->smtp->from}';

	\$cfg->routeGoogleAPIKey = '{$request->routeGoogleAPIKey}';

	\$cfg->appUrl = '$appUrl/';


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
				$sql = getTemplate(BASE_DIR . "/include/install.sql", NULL, $request);
				debug('sql', $sql);
				//$requests = str_replace("ENGINE=InnoDB", "", $requests);
				$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
				if ($st->execute() === FALSE) {
					throw new Exception('Error: ' . sprint_r($db->errorInfo()));
				}
			}
		} catch (Exception $e) {
			throw $e;
		}
	}

	function removeDatabase() {
		global $cfg, $db;

		$sql = <<<EOF
SELECT CONCAT( 'DROP TABLE ', GROUP_CONCAT(table_name) , ';' )
    AS statement FROM information_schema.tables
    WHERE table_schema = '{$cfg->database}' AND table_name LIKE '{$cfg->prefix}%';
EOF;
		$st = $db->prepare($sql,
			array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute() === FALSE) {
			throw new Exception('Error: ' . sprint_r($db->errorInfo()));
		}
		$array = $st->fetch();
		$statement = $array['statement'];
		debug('$statement', $statement);
		$st = $db->prepare($statement,
			array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute() === FALSE) {
			throw new Exception('Error: ' . sprint_r($db->errorInfo()));
		}
	}
	
	function createUserAdmin($request) {
		global $db;
		if ($request->dbCreation == 1) {
			$sql = <<<EOF
INSERT INTO {$request->prefix}user_admin (login, password) VALUES
	(:login, :password);
EOF;
			debug("start 1", $sql);
			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':login' => $request->adminLogin,
				':password' => $request->adminPassword,
			)) === FALSE) {
				throw new Exception('Cannot insert row in database: '.sprint_r($db->errorInfo()));
			}
		}
	}

	function removeConfigIniFile() {
		unlink(CONFIG_INI);
	}

	function removeLogFiles() {
		unlink(TRACE_LOG);
	}

	function deleteDirectory($dirname) {
         if (is_dir($dirname))
           $dir_handle = opendir($dirname);
	 if (!$dir_handle) {
		return false;
	 }
	 while($file = readdir($dir_handle)) {
	       if ($file != "." && $file != "..") {
	            if (!is_dir($dirname."/".$file))
	                 unlink($dirname."/".$file);
	            else
	                 deleteDirectory($dirname.'/'.$file);
	       }
	 }
	 closedir($dir_handle);
	 rmdir($dirname);
	 return true;
	}
?>
