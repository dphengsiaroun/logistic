<?php

	require_once(BASE_DIR . "/include/account.inc.php");
	require_once(BASE_DIR . "/include/event.inc.php");
	require_once(BASE_DIR . "/include/image.inc.php");

	class Proposal {

		public static function create($account, $request) {
			$request->accountId = $account->id;
			$request->login = $account->content->login;
			$e = Event::insert('/proposal/create', $request);
			Event::synchronize();
			$proposal = self::retrieve($e->id);
			return $proposal;
		}

		public static function retrieve($id) {
			global $db, $cfg;
			// On lance notre requête de vérification
			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}proposal WHERE id=:id
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			if ($st->rowCount() == 0) {
				throw new Exception('Proposal not found for id = ' . $id);
			}

			$array = $st->fetch();
			$proposal = new Proposal();
			$proposal->id = $array['id'];
			$proposal->accountId = $array['account_id'];
			$proposal->content = json_decode($array['content']);
			debug('Proposal retrieved.');
			return $proposal;
		}

		public static function listAll($request) {
			global $db, $cfg;
			// On lance notre requête de vérification
			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}proposal
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

		public static function delete($account, $request) {
			$request->accountId = $account->id;
			$e = Event::insert('/proposal/delete', $request);
			Event::synchronize();
		}

		public static function update($account, $request) {
			$request->accountId = $account->id;
			$e = Event::insert('/proposal/update', $request);
			Event::synchronize();
			$proposal = self::retrieve($request->id);
			return $proposal;
		}
	}

