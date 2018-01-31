<?php

	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	require_once(BASE_DIR . "/class/RememberMe.php");
	require_once(BASE_DIR . "/class/Event.php");
	require_once(BASE_DIR . "/class/RestResource.php");

	debug('cookie', $_COOKIE);

	class User extends RestResource {

		public function create($request) {
			if ($request === null) {
				$request = getRequest();
			}
			debug('create user', $request);
			debug('existLogin start', $request);
			$this->checkAlreadyExists($request);
			$e = Event::insert('/user/create', $request);
			debug('create user insert event done');
			Event::synchronize();
			debug('create user synchronized done', $e->id);
			$user = new User();
			$user->retrieve($e->id);
			$user->connect();
			return $user;
		}

		public function retrieve($id) {
			global $db, $cfg;
			// On lance notre requête de vérification
			debug('User retrieve');

			$this->id = $id;
			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}user WHERE id=:id
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
			$this->email = $array['email'];
			$this->password = $array['password'];
			$this->content = json_decode($array['content']);
			debug('user retrieved');
			return $this;
		}

		public function update($id = NULL) {
			debug('User update');
			
			if ($id === NULL) {
				debug('user update without id');
				$request = $this;
			} else {
				debug('user update with id');
				$request = getRequest();
				$user = User::getConnected();
				$request->id = $id;
			}
			$e = Event::insert('/user/update', $request);
			Event::synchronize();
			$this->retrieve($request->id);
			debug('user update result', $this);
			return $this;
		}

		public function delete($id) {
			$request = new stdClass();
			$user = User::getConnected();
			$request->id = $user->id;
			$e = Event::insert('/user/delete', $request);
			Event::synchronize();
			User::signout();
		}

		public static function getConnected() {
			debug('getConnected start');
			if (isset($_COOKIE['userId'])) {
				debug('cookie found', $_COOKIE['userId']);
				$user = new User();
				debug('new User');
				$user->retrieve($_COOKIE['userId']);
				debug('User', $user);
				if (!$user->getRememberMe()->checkToken()) {
					throw new Exception(ERROR_NEED_AUTHENTICATION_MSG, ERROR_NEED_AUTHENTICATION_CODE);
				}
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

		public function reportLoadedPicture() {
			global $db;
			$pictureDir = $this->getPictureDir();
			$size = 123;
			if ($_SERVER['REQUEST_METHOD'] == 'POST') {
				debug('post');
				if (!isset($this->content->loaded)) {
					debug('adding picture');
					$this->content->loaded = new StdClass();
				}
				debug('adding picture 2');
				$this->content->loaded->{$pictureDir} = $size;

				$this->update();
			} else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
				if (isset($this->content->loaded)) {
					debug('$this->content->loaded', $this->content->loaded);
					if (isset($this->content->loaded->{$pictureDir})) {
						unset($this->content->loaded->{$pictureDir});
					}
				}
				$this->update();
			}

			debug('loadPicture', $this);
		}

		public function getRemainingMaxFileSize() {
			$totalSize = $this->getTotalSize();
			return MAX_PICTURE_SIZE_PER_ACCOUNT - $this->getTotalSize();
		}

		public function getTotalSize() {
			$result = 0;
			if (!isset($this->content->loaded)) {
				return $result;
			}
			foreach ($this->content->loaded as $key => $value) {
				$result += $value;
			}
			debug('totalSize', $result);
			return $result;
		}

		public function getPictureDir() {
			debug('getPictureDir start');
			$suffix = '';
			if (isset($_POST['suffix'])) {
				debug('extract suffix from POST');
				$suffix = $_POST['suffix'];
			} else if (isset($_GET['suffix'])) {
				debug('extract suffix from GET');
				$suffix = $_GET['suffix'];
			} else {
				debug('No suffix');
			}
			return 'acct_' . $this->id . $suffix;
		}

		public static function exists($email) {
			global $db, $cfg;

			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}user WHERE email=:email;
EOF;
			
			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':email' => $email
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			return $st->rowCount() == 1;
		}


		public static function checkAlreadyExists($request) {
			global $db, $cfg;
			debug('checkAlreadyExists start');

			$sql = <<<EOF
SELECT
	login = :login AS login,
    email = :email AS email,
	phone = :phone AS phone
FROM 
	{$cfg->prefix}user 
WHERE
	(email=:email 
	OR login=:login 
	OR phone=:phone);
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':email' => $request->email,
				':login' => $request->content->login,
				':phone' => $request->content->phone
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}
			if ($st->rowCount() > 0) {
				debug('rowCount() > 0');
				$line = $st->fetch();
				debug('$line', $line);
				if ($line['login'] == 1) {
					throw new Exception(ERROR_LOGIN_ALREADY_EXISTS_MSG, ERROR_LOGIN_ALREADY_EXISTS_CODE);
				}
				if ($line['email'] == 1) {
					throw new Exception(ERROR_EMAIL_ALREADY_EXISTS_MSG, ERROR_EMAIL_ALREADY_EXISTS_CODE);
				}
				if ($line['phone'] == 1) {
					throw new Exception(ERROR_PHONE_ALREADY_EXISTS_MSG, ERROR_PHONE_ALREADY_EXISTS_CODE);
				}
				throw new Exception(ERROR_TECHNICAL_MSG, ERROR_TECHNICAL_CODE);
			}

			return $st->rowCount() == 1;
		}


		public static function retrieveFromEmail($email) {
			global $db, $cfg;

			$sql = <<<EOF
SELECT id FROM {$cfg->prefix}user WHERE email=:email;
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':email' => $email
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			if ($st->rowCount() == 0) {
				throw new Exception('User not found for email = ' . $email);
			}
			$id = $st->fetch()['id'];
			$user = new User();
			$user->retrieve($id);
			return $user;
		}

		public function connect() {
			debug('connect', $this);
			$this->lastToken = $this->getRememberMe()->connect();
			debug('end connect');
		}

		public function getRememberMe() {
			debug('getRememberMe');
			$result = new RememberMe($this);
			debug('getRememberMe done', $result);
			return $result;
		}

		public static function retrieveFromCode($id, $code) {
			global $db, $cfg;
			self::signout();


			$sql = <<<EOF
SELECT id FROM {$cfg->prefix}user WHERE
	id = :id AND INSTR(content, :code) != 0;
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $id,
				':code' => $code
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}


			if ($st->rowCount() == 0) {
				throw new Exception(ERROR_BAD_REACTIVATION_CODE_MSG, ERROR_BAD_REACTIVATION_CODE_CODE);
			}
			self::checkForgottenPasswordCode($code);
			$id = $st->fetch()['id'];
			$user = new User();
			$user->retrieve($id);
			return $user;
		}

		public static function checkForgottenPasswordCode($code) {
			debug('checkForgottenPasswordCode', $code);
			$array = explode('_', $code);
			debug('array', $array);
			if (count($array) == 2) {
				$time = $array[1];
				debug('time', $time);
				if ($time > time()) {
					return;
				}
				throw new Exception(ERROR_EXPIRED_REACTIVATION_CODE_MSG, ERROR_EXPIRED_REACTIVATION_CODE_CODE);
			}
			throw new Exception(ERROR_BAD_REACTIVATION_CODE_MSG, ERROR_BAD_REACTIVATION_CODE_CODE);
		}

		public static function syncFromGoogle($ownerDetails) {
			$email = $ownerDetails->getEmail();
			try {
				$user = self::retrieveFromEmail($email);
				$user->connect();
			} catch (Exception $e) {
				// Create the user
				$request = new stdClass();
				$request->email = $email;
				$request->password = '';
				$content = new stdClass();
				$request->content = $content;
				$content->lastname = $ownerDetails->getLastName();
				$content->firstname = $ownerDetails->getFirstName();
				$content->login = preg_replace('/@.*$/', '', $request->email);
				$content->sync = 'google';
				$user = new User();
				$user->create($request);
			}
		}

		public static function syncFromFacebook($ownerDetails) {
			$email = $ownerDetails->getEmail();
			try {
				$user = self::retrieveFromEmail($email);
				$user->connect();
			} catch (Exception $e) {
				// Create the user
				$request = new stdClass();
				$request->email = $email;
				$request->password = '';
				$content = new stdClass();
				$request->content = $content;
				$content->lastname = $ownerDetails->getLastName();
				$content->firstname = $ownerDetails->getFirstName();
				$content->login = preg_replace('/@.*$/', '', $request->email);
				$content->sync = 'facebook';
				self::create($request);
			}
		}

		public function createForgottenPasswordCode() {
			debug('createForgottenPasswordCode');
			$now = time();
			debug('now', $now);
			//$expireTime = $now + 5;
			$expireTime = $now + FORGOTTEN_PASSWORD_EXPIRED_DELAY;
			debug('expireTime', $expireTime);
			$this->content->forgottenPasswordCode = hash('sha256', $this->id + SECRET + time()) . '_' . $expireTime;
			debug('forgottenPasswordCode', $this->content->forgottenPasswordCode);
			$this->update();
		}

		public function getReactivationUrl() {
			return getAppUrl() . 'choose-new-password?id=' . $this->id . '&code=' . $this->content->forgottenPasswordCode;
		}

		public static function signout() {
			try {
				$user = self::getConnected();
				$user->getRememberMe()->disconnect();
			} catch (Exception $e) {}
		}

		public function patch() {
			// Patch is use only for updating the password
			return $this->updatePassword();
		}

		public function updatePassword() {
			$request = getRequest();
			$user = NULL;
			if (property_exists($request, 'id') && property_exists($request, 'code')) {
				$user = User::retrieveFromCode($request->id, $request->code);
			} else {
				$user = User::getConnected();
				if ($user->password != '' && $request->oldPassword != $user->password) {
					throw new Exception(ERROR_INCORRECT_OLD_PASSWORD_MSG, ERROR_INCORRECT_OLD_PASSWORD_CODE);
				}
			}

			$user->password = $request->newPassword;
			$user->update();
			return $user;
		}


	}

