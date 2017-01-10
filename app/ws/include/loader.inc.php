<?php

	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	require_once(BASE_DIR . "/include/rememberMe.inc.php");
	require_once(BASE_DIR . "/include/account.inc.php");

	debug('cookie', $_COOKIE);

	class Loader {

		private $loader;

		public function __construct($loader) {
			if (!property_exists($loader)) {
				//$loader = new stdClass();
				//$loader->save();
			}
			//$this->loader = $loader;
			debug('contenu loader', $loader);
		}

		public function create($request) {
			global $db, $cfg;

			$loader = new stdClass();
			foreach ($request as $key => $value) {
				$loader->{$key} = $value;
 			}

			$name = str2spinal($request->name);
			$loader->id = $name;
			debug('contenu du loader apres foreach', $loader);

			$sql = <<<EOF
INSERT INTO {$cfg->prefix}loader (content, account_id) VALUES
	(:content, :account_id);
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':content' => json_encode($loader),
				':account_id' => $_COOKIE['accountId']
			)) === FALSE) {
				throw new Exception('Table creation: '.sprint_r($db->errorInfo()));
			}
			return $loader;
		}

		public static function listAll($account) {

		}

		public function save() {
			global $db, $cfg;

			$sql = <<<EOF
UPDATE {$cfg->prefix}loader
SET content = :content, account_id = :account_id
WHERE id = :id
EOF;

			$st = $db->prepare($sql,
				array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':content' => json_encode($this->content),
				':account_id' => $this->account->id,
				':id' => $this->id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}
		}

		public function delete() {
			global $db, $cfg;

			$sql = <<<EOF
DELETE FROM {$cfg->prefix}loader
WHERE id = :id;
EOF;

			$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $this->id,
			)) === FALSE) {
				throw new Exception('Cannot delete ad : '.sprint_r($db->errorInfo()));
			}
			self::signout();
			debug("delete ad ok");
		}

	

	}

