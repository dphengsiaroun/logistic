<?php

	require_once(BASE_DIR . '/class/RestResource.php');
	require_once(BASE_DIR . '/class/User.php');

	class Connection extends RestResource {

		public function create() {
			$request = getRequest();
			debug('connection create start', $request);
			$user = self::signin($request->login, $request->password);
			debug('connection about to insert event', $user);
			$e = Event::insert('/'. strtolower($this->getName()) .'/create', $request);
			Event::synchronize();
			$result = new static();
			$result->id = $user->lastToken->code;
			$result->user = $user;
			return $result;
		}

		public function retrieve($id) {
			debug('Connection retrieve');
			$user = User::getConnected();
			$this->id = $id;
			$this->user = $user;
			return $this;
		}

		public function delete($id) {
			debug('Connection delete');
			$request = new stdClass();
			$request->id = $id;
			$user = User::getConnected();
			$request->userId = $user->id;
			$e = Event::insert('/' . strtolower($this->getName()) . '/delete', $request);
			Event::synchronize();
			User::signout();
		}

		public static function signin($login, $password) {
			global $db, $cfg;

			debug('Connection signin');

			User::signout();
			
			$sql = <<<EOF
SELECT id FROM {$cfg->prefix}user WHERE
	(email = :login OR login = :login OR phone = :login) AND
	password = :password;
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':login' => $login,
				':password' => $password,
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}


			if ($st->rowCount() == 0) {
				throw new Exception(ERROR_BAD_LOGIN_MSG, ERROR_BAD_LOGIN_CODE);
			}
			$id = $st->fetch()['id'];
			$user = new User();
			$user->retrieve($id);
			$user->connect();

			return $user;
		}

		

	}

