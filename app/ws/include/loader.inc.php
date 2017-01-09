<?php

	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	require_once(BASE_DIR . "/include/rememberMe.inc.php");
	require_once(BASE_DIR . "/include/account.inc.php");

	debug('cookie', $_COOKIE);

	class Loader {

		private $request;

		public function __construct($request) {
			$this->request = $request;
		}

		public static function create($request) {
			global $db, $cfg;

			$loader = new Loader();
			foreach ($request as $key => $value) {
				$truck->{$key} = $value;
 			}

			$sql = <<<EOF
INSERT INTO {$cfg->prefix}loader (content, account_id) VALUES
	(:content, :account_id);
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':content' => json_encode($request->content),
				':account_id' => $request->account->id
			)) === FALSE) {
				throw new Exception('Table creation: '.sprint_r($db->errorInfo()));
			}
			return $loader;
		}

		public static function listAll($account) {
			/*if (!property_exists($account->content, 'loaders')) {
				$account->content->loaders = new stdClass();
				$account->save();
			}
			return $account->content->loaders;*/
		}

	

	}

