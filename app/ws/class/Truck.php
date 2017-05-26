<?php

require_once(BASE_DIR . "/class/RestResource.php");

class Truck extends RestResource {

	public function __construct() {
		$account = User::getConnected();
		if (!property_exists($account->content, 'trucks')) {
			$account->content->trucks = new stdClass();
			$account->save();
		}
	}

	public function create() {
		$account = User::getConnected();
		$request = getRequest();

		$request->login = $account->content->login;
		$request->created_t = time();
		Image::manageSession($account, $request);
		debug('request', $request);
		if (!property_exists($request, 'name')) {
			throw new Exception(ERROR_MISSING_TRUCK_NAME_MSG, ERROR_MISSING_TRUCK_NAME_CODE);
		}
		$name = str2spinal($request->name);
		$request->id = $name;
		$account->content->trucks->{$name} = $request;
		$account->save();
		return $account->content->trucks->{$name};
	}

	public function listAll() {
		$request = getRequest();
		debug('$request', $request);
		$account = User::getConnected();
		return $account->content->trucks;
	}

	public function retrieve($id) {
		return self::listAll()->{$id};
	}

	public function update($id) {
		$request = getRequest();
		debug('request update', $request);
		$this->delete($request->id);
		unset($request->id);
		return $this->create();
	}

	public function delete($id) {
		$request = new stdClass();
		$request->id = $id;
		$account = User::getConnected();
		unset($account->content->trucks->{$id});
		$account->save();
		return $account->content->trucks;
	}
}
