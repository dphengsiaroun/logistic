<?php

	require_once(BASE_DIR . "/class/Account.php");
	require_once(BASE_DIR . "/class/Event.php");

	class Carrier {

		public static function create() {
			$account = Account::getConnected();
			$request = getRequest();
			$request->accountId = $account->id;
			$request->login = $account->content->login;
			$e = Event::insert('/carrier/create', $request);
			Event::synchronize();
			$carrier = self::retrieve($e->id);
			return $carrier;
		}

		public static function retrieve($id) {
			global $db, $cfg;
			// On lance notre requête de vérification
			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}carrier WHERE id=:id
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			if ($st->rowCount() == 0) {
				throw new Exception('Carrier not found for id = ' . $id);
			}

			$array = $st->fetch();
			$carrier = new Carrier();
			$carrier->id = $array['id'];
			$carrier->accountId = $array['account_id'];
			$carrier->content = json_decode($array['content']);
			debug('Carrier retrieved.');
			return $carrier;
		}

		public static function listAll() {
			global $db, $cfg;

			$request = getQueryString();

			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}carrier
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

		public static function delete($id) {
			$request = new stdClass();
			$request->id = $id;
			$account = Account::getConnected();
			$request->accountId = $account->id;
			$e = Event::insert('/carrier/delete', $request);
			Event::synchronize();
		}

		public static function update($id) {
			$request = getRequest();
			$account = Account::getConnected();
			$request->id = $id;
			$request->accountId = $account->id;
			$e = Event::insert('/carrier/update', $request);
			Event::synchronize();
			$carrier = self::retrieve($request->id);
			return $carrier;
		}
	}

