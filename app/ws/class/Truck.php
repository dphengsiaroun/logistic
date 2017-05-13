<?php

	require_once(BASE_DIR . "/class/Account.php");
	require_once(BASE_DIR . "/class/Image.php");

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

		public static function create() {
			$request = getRequest();
			$account = Account::getConnected();
			$truck = new Truck($account);
			$request->login = $account->content->login;
			$request->created_t = time();
			Image::manageSession($account, $request);
			foreach ($request as $key => $value) {
				$truck->{$key} = $value;
 			}
			debug('request', $request);
			if (!property_exists($request, 'name')) {
				throw new Exception(ERROR_MISSING_TRUCK_NAME_MSG, ERROR_MISSING_TRUCK_NAME_CODE);
			}
			$name = str2spinal($request->name);
			$truck->id = $name;
			$account->content->trucks->{$name} = $truck;
			$account->save();
			return $truck;
		}

		public static function listAll() {
			$request = getRequest();
			debug('$request', $request);
			$account = Account::getConnected();
			if (!property_exists($account->content, 'trucks')) {
				$account->content->trucks = new stdClass();
				$account->save();
			}
			return $account->content->trucks;
		}

		public static function retrieve($account, $id) {
			return self::listAll($account)->{$id};
		}

		public static function update() {
			$request = getRequest();
			debug('request update', $request);
			$account = Account::getConnected();
			self::delete($request->oldId);
			unset($request->oldId);
			return self::create();
		}

		public static function delete($id) {
			$request = new stdClass();
			$request->id = $id;
			$account = Account::getConnected();
			unset($account->content->trucks->{$id});
			$account->save();
			return $account->content->trucks;
		}




	}



