<?php

	debug('user admin start', BASE_DIR);	
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	require_once(BASE_DIR . "/admin/class/RememberMe.php");

	debug('cookie', $_COOKIE);

	class User {

		// retrieve admin
		public function retrieve($id) {
			global $db, $cfg;
			// On lance notre requête de vérification
			debug('User admin retrieve');

			$this->id = $id;
			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}user_admin WHERE id=:id
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $this->id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			if ($st->rowCount() == 0) {
				throw new Exception('User not found for id = ' . $this->id);
			}

			$array = $st->fetch();
			$this->login = $array['login'];
			$this->password = $array['password'];
			debug('user admin retrieved', $array);
			return $this;
		}
		// End


		// getConnected ADMIN
		public static function getConnected() {
			debug('getConnected Admin start');
			if (isset($_COOKIE['userIdAdmin'])) {
				debug('cookie found', $_COOKIE['userIdAdmin']);
				$user = new User();
				debug('new User');
				$user->retrieve($_COOKIE['userIdAdmin']);
				debug('User Admin', $user);
				// if (!$user->getRememberMe()->checkToken()) {
				// 	throw new Exception(ERROR_NEED_AUTHENTICATION_MSG, ERROR_NEED_AUTHENTICATION_CODE);
				// }
				return $user;
			}
			throw new Exception(ERROR_NEED_AUTHENTICATION_MSG, ERROR_NEED_AUTHENTICATION_CODE);
		}

		public static function isConnected() {
			try {
				self::getConnected();
			} catch (Exception $e) {
				return false;
			}
			return true;
		}

		public function connect() {
			debug('connect admin', $this);
			$this->lastTokenAdmin = $this->getRememberMe()->connect();
			debug('end connect admin');
		}

		public function getRememberMe() {
			debug('getRememberMe');
			$result = new RememberMe($this);
			debug('getRememberMe done', $result);
			return $result;
		}

		public static function signout() {
			try {
				$user = self::getConnected();
				$user->getRememberMe()->disconnect();
			} catch (Exception $e) {}
		}

	}

