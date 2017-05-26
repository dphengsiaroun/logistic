<?php

	require_once(BASE_DIR . '/class/RestResource.php');
	require_once(BASE_DIR . '/class/User.php');

	class Connection extends RestResource {

		public function create() {
			$request = getRequest();
			$user = User::signin($request->email, $request->password);
			$e = Event::insert('/'. strtolower($this->getName()) .'/create', $request);
			Event::synchronize();
			$result = new static();
			$result->user = $user;
			return $result;
		}

		public function retrieve($id) {
			$result = new static();
			$user = User::getConnected();
			$result->user = $user;
			return $result;
		}

		

	}

