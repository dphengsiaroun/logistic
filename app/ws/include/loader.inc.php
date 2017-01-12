<?php

	require_once(BASE_DIR . "/include/account.inc.php");
	require_once(BASE_DIR . "/include/event.inc.php");

	class Loader {

		public static function create($account, $request) {
			$request->accountId = $account->id;
			$e = Event::insert('/loader/create', $request);
			Event::synchronize();
			$loader = self::retrieve($e->id);
			return $loader;
		}

		public static function retrieve($id) {
			global $db, $cfg;
			// On lance notre requête de vérification
			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}loader WHERE id=:id
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			if ($st->rowCount() == 0) {
				throw new Exception('Loader not found for id = ' . $id);
			}

			$array = $st->fetch();
			$loader = new Loader();
			$loader->id = $array['id'];
			$loader->accountId = $array['account_id'];
			$loader->content = json_decode($array['content']);
			debug('Loader retrieved.');
			return $loader;
		}

		public static function listAll() {
			global $db, $cfg;
			// On lance notre requête de vérification
			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}loader
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			$result = array();

			while ($array = $st->fetch()) {
				$array['content'] = json_decode($array['content']);
				$result[$array['id']] = $array;
			}
			return $result;
		}

		public static function delete($account, $request) {
			global $db, $cfg;

			$loader = self::retrieve($request->id);

			if ($account->id != $loader->accountId) {
				throw new Exceptions('Forbidden operation. Account must match.');
			}
			// On lance notre requête de vérification
			$sql = <<<EOF
DELETE FROM {$cfg->prefix}loader WHERE id=:id
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $request->id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}
		}

		

	
	

	}

