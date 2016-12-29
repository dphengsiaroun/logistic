<?php

	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");

	class Account {

		public function __construct($id) {
			$this->id = $id;
			$this->retrieve();
			debug('account', $this);
		}

		public static function create($request) {
			global $db;

			$sql = <<<EOF
INSERT INTO account (email, password, content) VALUES
	(:email, :password, :content);
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':email' => $request->email,
				':password' => $request->password,
				':content' => json_encode($request->content)
			)) === FALSE) {
				throw new Exception('Table creation: '.sprint_r($db->errorInfo()));
			}
			$id = $db->lastInsertId();
			$_SESSION['id'] = $id;
			return new Account($id);
		}

		public static function getConnected() {
			if (!isset($_SESSION['id'])) {
				throw new Exception(ERROR_NEED_AUTHENTICATION_MSG, ERROR_NEED_AUTHENTICATION_CODE);
			}
			$account = new Account($_SESSION['id']);
			return $account;
		}

		protected function retrieve() {
			global $db;
			// On lance notre requête de vérification
			$sql = <<<EOF
SELECT * FROM account WHERE id=:id
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $this->id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			$array = $st->fetch();
			$this->email = $array['email'];
			$this->password = $array['password'];
			$this->content = json_decode($array['content']);
			debug('account retrieved');
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

				$this->save();
			} else if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
				if (isset($this->content->loaded)) {
					debug('$this->content->loaded', $this->content->loaded);
					if (isset($this->content->loaded->{$pictureDir})) {
						unset($this->content->loaded->{$pictureDir});
					}
				}
				$this->save();
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
			$suffix = '';
			if (isset($_POST['suffix'])) {
				debug('extract suffix from POST');
				$suffix = $_POST['suffix'];
			} else if (isset($_GET['suffix'])) {
				debug('extract suffix from GET');
				$suffix = $_GET['suffix'];
			}
			return 'acct_' . $this->id . $suffix;
		}

		public function save() {
			global $db;

			$sql = <<<EOF
UPDATE account
SET email = :email, password = :password, content = :content
WHERE id = :id
EOF;

			$st = $db->prepare($sql,
				array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':email' => $this->email,
				':password' => $this->password,
				':content' => json_encode($this->content),
				':id' => $this->id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}
		}

		public function delete() {
			global $db;

			$sql = <<<EOF
DELETE FROM account
WHERE id = :id;
EOF;

			$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $this->id,
			)) === FALSE) {
				throw new Exception('Cannot delete account : '.sprint_r($db->errorInfo()));
			}
			self::signout();
			debug("delete account ok");
		}

		public static function exists($email) {
			global $db;

			$sql = <<<EOF
SELECT * FROM account WHERE email=:email;
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

		public static function retrieveFromEmail($email) {
			global $db;

			$sql = <<<EOF
SELECT id FROM account WHERE email=:email;
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':email' => $email
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			if ($st->rowCount() == 0) {
				throw new Exception('Account not found for email = ' . $email);
			}
			$id = $st->fetch()['id'];
			return new Account($id);
		}

		public static function signin($email, $password) {
			global $db;
			self::signout();

			$sql = <<<EOF
SELECT id FROM account WHERE
	email = :email AND
	password = :password;
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':email' => $email,
				':password' => $password,
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}


			if ($st->rowCount() == 0) {
				throw new Exception(ERROR_BAD_LOGIN_MSG, ERROR_BAD_LOGIN_CODE);
			}
			$id = $st->fetch()['id'];
			$_SESSION['id'] = $id;
			return new Account($id);
		}

		public static function retrieveFromCode($id, $code) {
			global $db;
			self::signout();


			$sql = <<<EOF
SELECT id FROM account WHERE
	id = 41;
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}


			if ($st->rowCount() == 0) {
				throw new Exception(ERROR_BAD_REACTIVATION_CODE_MSG, ERROR_BAD_REACTIVATION_CODE_CODE);
			}
			$id = $st->fetch()['id'];
			// we do not open a session for this one
			return new Account($id);
		}

		public static function syncFromGoogle($ownerDetails) {
			$email = $ownerDetails->getEmail();
			$account = NULL;
			try {
				$account = self::retrieveFromEmail($email);
			} catch (Exception $e) {
				// Create the account
				$request = new stdClass();
				$request->email = $email;
				$request->password = '';
				$content = new stdClass();
				$request->content = $content;
				$content->lastname = $ownerDetails->getLastName();
				$content->firstname = $ownerDetails->getFirstName();
				$content->sync = 'google';
				self::create($request);
			}
		}

		public static function syncFromFacebook($ownerDetails) {
			$email = $ownerDetails->getEmail();
			$account = NULL;
			try {
				$account = self::retrieveFromEmail($email);
			} catch (Exception $e) {
				// Create the account
				$request = new stdClass();
				$request->email = $email;
				$request->password = '';
				$content = new stdClass();
				$request->content = $content;
				$content->lastname = $ownerDetails->getLastName();
				$content->firstname = $ownerDetails->getFirstName();
				$content->sync = 'facebook';
				self::create($request);
			}
		}

		public function createForgottenPasswordCode() {
			debug('createForgottenPasswordCode');
			$this->content->forgottenPasswordCode = hash('sha256', 'kiki');
			$this->save();
		}

		public function getReactivationUrl() {
			return getAppUrl() . '#/choose-new-password?id=' . $this->id . '&code=' . $this->content->forgottenPasswordCode;
		}

		public static function signout() {
			if (isset($_SESSION['id'])) {
				unset($_SESSION['id']);
			}
		}


	}

