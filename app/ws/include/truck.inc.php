<?php

	require_once(BASE_DIR . "/include/account.inc.php");

	class Truck {

		private $account;

		public function __construct($account) {
			if (!property_exists($account->content, 'trucks')) {
				$account->content->trucks = new stdClass();
				$account->save();
			}
			$this->account = $account;
		}

		public static function create($account, $request) {
			$truck = new Truck($account);
			foreach ($request->content as $key => $value) {
				$truck->{$key} = $value;
 			}
			$truck->name = $request->name;
			$name = str2spinal($request->name);
			$account->content->trucks->{$name} = $truck;
			$account->save();
			return $truck;
		}

		public static function listAll($account) {
			return $account->content->trucks;
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



