<?php
	class Account {


		public function __construct() {
			if (!isset($_SESSION['id'])) {
				throw new Exception(ERROR_NEED_AUTHENTICATION_MSG, ERROR_NEED_AUTHENTICATION_CODE);
			}
			$this->id = $_SESSION['id'];
			$this->retrieve();
			debug_r('account', $this);
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

		public function loadPicture() {
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
					debug_r('$this->content->loaded', $this->content->loaded);
					if (isset($this->content->loaded->{$pictureDir})) {
						unset($this->content->loaded->{$pictureDir});
					}
				}
				$this->save();
			}

			debug_r('loadPicture', $this);
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
			debug_r('totalSize', $result);
			return $result;
		}

		public static function getPictureDir() {
			$suffix = '';
			if (isset($_POST['suffix'])) {
				$suffix = $_POST['suffix'];
			}
			if (isset($_GET['suffix'])) {
				$suffix = $_GET['suffix'];
			}
			return 'acct_'.$_SESSION['id'].$suffix;
		}

		protected function save() {
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
	}


?>

