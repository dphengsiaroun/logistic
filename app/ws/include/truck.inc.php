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
			debug('$this->account', $this->account);
		}

		public static function create($account, $request) {
			$truck = new Truck($account);
			foreach ($request as $key => $value) {
				$truck->{$key} = $value;
 			}
			$name = str2spinal($request->name);
			$truck->id = $name;
			$account->content->trucks->{$name} = $truck;
			$account->save();
			return $truck;
		}

		public static function listAll($account) {
			if (!property_exists($account->content, 'trucks')) {
				$account->content->trucks = new stdClass();
				$account->save();
			}
			return $account->content->trucks;
		}

		public static function retrieve($account, $id) {
			return self::listAll($account)->{$id};
		}

		public static function update($account, $request) {
			self::delete($account, $request->oldId);
			unset($request->oldId);
			return self::create($account, $request);
		}

		public static function delete($account, $id) {
			unset($account->content->trucks->{$id});
			$account->save();
			return $account->content->trucks;
		}
		

		

	}



