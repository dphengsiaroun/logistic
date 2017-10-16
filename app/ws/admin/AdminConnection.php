<?php

	require_once(BASE_DIR . '/class/User.php');

	class AdminConnection {

        public function create() {
			$request = getRequest();
			debug('connection start', $request);
			$user = self::signin($request->login, $request->password);
			$result = new static();
			$result->id = $user->lastToken->code;
			$result->user = $user;
			return $result;
		}

        public static function signin($login, $password) {
			global $db, $cfg;
			self::signout();
			
			$sql = <<<EOF
SELECT id FROM {$cfg->prefix}user_admin WHERE
	(login = :login) AND
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

        public static function signout() {
			try {
				$user = User::getConnected();
				$user->getRememberMe()->disconnect();
			} catch (Exception $e) {}
		}
    }
        
?>