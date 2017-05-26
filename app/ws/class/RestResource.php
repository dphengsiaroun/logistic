<?php

	require_once(BASE_DIR . "/class/User.php");
	require_once(BASE_DIR . "/class/Event.php");
	require_once(BASE_DIR . "/class/Image.php");

	abstract class RestResource {

		public function getName() {
			return get_class($this);
		}

		public function create() {
			$account = User::getConnected();
			$request = getRequest();
			$request->accountId = $account->id;
			$request->login = $account->content->login;
			Image::manageSession($account, $request);
			$e = Event::insert('/'. strtolower($this->getName()) .'/create', $request);
			Event::synchronize();
			$result = $this->retrieve($e->id);
			return $result;
		}

		public function retrieve($id) {
			global $db, $cfg;
			// On lance notre requête de vérification
			$name = strtolower($this->getName());
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
				throw new Exception($this->getName() . ' not found for id = ' . $id);
			}

			$array = $st->fetch();
			$result = new static();
			$result->id = $array['id'];
			$result->accountId = $array['account_id'];
			$result->content = json_decode($array['content']);
			debug($this->getName() . ' retrieved.');
			return $result;
		}

		public function listAll() {
			global $db, $cfg;

			$name = strtolower($this->getName());
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

		public function delete($id) {
			$request = new stdClass();
			$request->id = $id;
			$account = User::getConnected();
			$request->accountId = $account->id;
			$e = Event::insert('/' . strtolower($this->getName()) . '/delete', $request);
			Event::synchronize();
		}

		public function update($id) {
			$request = getRequest();
			$account = User::getConnected();
			$request->id = $id;
			$request->accountId = $account->id;
			$e = Event::insert('/' . strtolower($this->getName()) . '/update', $request);
			Event::synchronize();
			$result = $this->retrieve($request->id);
			return $result;
		}
	}

