<?php

	debug('RememberMe admin start', BASE_DIR);	
	require_once(BASE_DIR . "/admin/class/User.php");

	class RememberMe {

		public function __construct($user) {
			$this->user = $user;
		}

		public function connect() {
			debug('token admin', $token);
			setcookie('rememberMeAdmin', $token->code,  $token->expirationTime, '/');
			setcookie('userIdAdmin', '' . $this->user->id,  $token->expirationTime, '/');
			return $token;
		}

		public function disconnect() {
			setcookie('userIdAdmin', '', 0, '/');
			setcookie('rememberMeAdmin', '', 0, '/');
			debug('COOKIE', $_COOKIE);
		}
	}

