<?php

	require_once(BASE_DIR . '/class/RestResource.php');
	require_once(BASE_DIR . '/class/User.php');

	class Connection extends RestResource {

		public function create() {
			$request = getRequest();
			$user = User::signin($request->email, $request->password);
			return $user;
		}

	}

