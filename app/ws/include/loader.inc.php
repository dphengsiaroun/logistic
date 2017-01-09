<?php

	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . "/include/misc.inc.php");
	require_once(BASE_DIR . "/include/database.inc.php");
	require_once(BASE_DIR . "/include/rememberMe.inc.php");
	require_once(BASE_DIR . "/include/account.inc.php");

	debug('cookie', $_COOKIE);

	class Loader {

		public function __construct($account) {
			if (!property_exists($account->content, 'trucks')) {
				$account->content->trucks = new stdClass();
				$account->save();
			}
			$this->account = $account;
		}

		public static function create($request) {
			global $db, $cfg;

			$sql = <<<EOF
INSERT INTO {$cfg->prefix}loader (content, account_id) VALUES
	(:content, :account_id);
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':content' => json_encode($request->content),
				':account_id' => $_COOKIE['accountId']
			)) === FALSE) {
				throw new Exception('Table creation: '.sprint_r($db->errorInfo()));
			}
			$loader = new Loader();
			foreach ($request as $key => $value) {
				$truck->{$key} = $value;
 			}
			$name = str2spinal($request->name);
			$truck->id = $name;
			$account->content->trucks->{$name} = $truck;
			return $loader;
		}

	

	}

