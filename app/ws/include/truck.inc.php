<?php

	require_once(BASE_DIR . "/include/account.inc.php");

	class Truck {

		private $account;

		public function __construct($account) {
			if (!property_exists($account->content, 'truck')) {
				$account->content->trucks = array();
				$account->save();
			}
			$this->account = $account;
		}

		public static function create($account, $request) {
			$truck = new Truck($account);
			foreach ($request as $key => $value) {
				$truck->{$key} = $value;
 			}
			$account->content->trucks[] = $truck;
			$account->save();
			return $truck;
		}

		public static function save($account, $request) {
			$truck = new Truck($account);
			foreach ($request as $key => $value) {
				$truck->{$key} = $value;
 			}
			$account->content->trucks[] = $truck;
			$account->save();
			return $truck;
		}

		

	}



