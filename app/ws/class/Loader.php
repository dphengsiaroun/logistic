<?php

	require_once(BASE_DIR . "/class/Account.php");
	require_once(BASE_DIR . "/class/Event.php");
	require_once(BASE_DIR . "/class/Image.php");

	class Loader {

		public static function create() {
			$account = Account::getConnected();
			$request = getRequest();
			$request->accountId = $account->id;
			$request->login = $account->content->login;
			Image::manageSession($account, $request);
			$e = Event::insert('/loader/create', $request);
			Event::synchronize();
			$loader = self::retrieve($e->id);
			return $loader;
		}

		public static function retrieve($id) {
			global $db, $cfg;

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
			$request = getQueryString();
			debug('$request', $request);
			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}loader
EOF;

			debug('listAll', $request);
			$array = array();

			if (is_object($request) && property_exists($request, 'accountId')) {
				$sql .= ' WHERE account_id = :account_id';
				$array['account_id'] = $request->accountId;
			}
			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute($array) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			$result = array();

			while ($array = $st->fetch()) {
				$array['content'] = json_decode($array['content']);
				$result[] = $array;
			}
			return $result;
		}

		public static function update($id) {
			$request = getRequest();
			$request->id = $id;
			$account = Account::getConnected();
			$request->accountId = $account->id;
			$e = Event::insert('/loader/update', $request);
			Event::synchronize();
			$loader = self::retrieve($request->id);
			return $loader;
		}

		public static function delete($id) {
			$request = new stdClass();
			$request->id = $id;
			$account = Account::getConnected();
			$request->accountId = $account->id;
			$e = Event::insert('/loader/delete', $request);
			Event::synchronize();
		}
	}
