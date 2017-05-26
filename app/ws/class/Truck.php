<?php

require_once(BASE_DIR . "/class/RestResource.php");

class Truck extends RestResource {

	public function __construct() {
		$user = User::getConnected();
		if (!property_exists($user->content, 'trucks')) {
			$user->content->trucks = new stdClass();
			$user->save();
		}
	}

	public function create() {
		$user = User::getConnected();
		$request = getRequest();

		$request->login = $user->content->login;
		$request->created_t = time();
		Image::manageSession($user, $request);
		debug('request', $request);
		if (!property_exists($request, 'name')) {
			throw new Exception(ERROR_MISSING_TRUCK_NAME_MSG, ERROR_MISSING_TRUCK_NAME_CODE);
		}
		$name = str2spinal($request->name);
		$request->id = $name;
		$user->content->trucks->{$name} = $request;
		$user->save();
		return $user->content->trucks->{$name};
	}

	public function listAll() {
		$request = getRequest();
		debug('$request', $request);
		$user = User::getConnected();
		return $user->content->trucks;
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
		$user = User::getConnected();
		unset($user->content->trucks->{$id});
		$user->save();
		return $user->content->trucks;
	}
}
