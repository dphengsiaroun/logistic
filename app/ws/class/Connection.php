<?php

	require_once(BASE_DIR . '/class/RestResource.php');
	require_once(BASE_DIR . '/class/User.php');

	class Connection extends RestResource {

		public function create() {
			$request = getRequest();
			debug('connection start', $request);
			$user = User::signin($request->email, $request->password);
			debug('connection about to insert event', $user);
			$e = Event::insert('/'. strtolower($this->getName()) .'/create', $request);
			Event::synchronize();
			$result = new static();
			$result->id = $user->lastToken->code;
			$result->user = $user;
			return $result;
		}

		public function retrieve($id) {
			$user = User::getConnected();
			$this->id = $id;
			$this->user = $user;
			return $this;
		}

		public function delete($id) {
			$request = new stdClass();
			$request->id = $id;
			$user = User::getConnected();
			$request->userId = $user->id;
			$e = Event::insert('/' . strtolower($this->getName()) . '/delete', $request);
			Event::synchronize();
			User::signout();
		}

		

	}

