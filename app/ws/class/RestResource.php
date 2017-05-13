<?php

	require_once(BASE_DIR . "/class/Account.php");
	require_once(BASE_DIR . "/class/Event.php");

	abstract class RestResource {

		abstract public static function getName();

		public static function create() {
			$account = Account::getConnected();
			$request = getRequest();
			$request->accountId = $account->id;
			$request->login = $account->content->login;
			$e = Event::insert('/'. strtolower(static::getName()) .'/create', $request);
			Event::synchronize();
			$result = static::retrieve($e->id);
			return $result;
		}

		public static function retrieve($id) {
			global $db, $cfg;
			// On lance notre requête de vérification
			$name = strtolower(static::getName());
			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}{$name} WHERE id=:id
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			if ($st->rowCount() == 0) {
				throw new Exception(static::getName() . ' not found for id = ' . $id);
			}

			$array = $st->fetch();
			$result = new static();
			$result->id = $array['id'];
			$result->accountId = $array['account_id'];
			$result->content = json_decode($array['content']);
			debug(static::getName() . ' retrieved.');
			return $result;
		}

		public static function listAll() {
			global $db, $cfg;

			$name = strtolower(static::getName());
			$request = getUrlQueryString();

			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}{$name}
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
			$e = Event::insert('/' . strtolower(static::getName()) . '/delete', $request);
			Event::synchronize();
		}

		public static function update($id) {
			$request = getRequest();
			$account = Account::getConnected();
			$request->id = $id;
			$request->accountId = $account->id;
			$e = Event::insert('/' . strtolower(static::getName()) . '/update', $request);
			Event::synchronize();
			$result = static::retrieve($request->id);
			return $result;
		}
	}

