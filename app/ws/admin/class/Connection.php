<?php

	debug('connection forbidden');
	require_once(BASE_DIR . '/admin/class/User.php');

	class Connection {

        public function create() {
			$request = getRequest();
			debug('admin connection create', $request);
			$user = self::signin($request->login, $request->password);
			$result = new static();
			debug('admin connection start');
			$result->id = $user->lastTokenAdmin->code;
			$result->user = $user;
			debug('$result', $result);
			return $result;
		}

		public function retrieve($id) {
			debug('Connection admin retrieve');
			$user = User::getConnected();
			$this->id = $id;
			$this->user = $user;
			return $this;
		}

		public function delete($id) {
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
			User::signout();

			debug('Connection admin signin start');
			
			$sql = <<<EOF
SELECT id FROM {$cfg->prefix}user_admin WHERE
	login = :login AND
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
        
?>