<?php

	debug('RememberMe admin start', BASE_DIR);	
	require_once(BASE_DIR . "/admin/class/User.php");

	class RememberMe {

		public function __construct($user) {
			$this->user = $user;
		}

		// connect
		public function connect() {
			$token = $this->addToken();
			debug('token admin', $token);
			setcookie('rememberMeAdmin', $token->code,  $token->expirationTime, '/');
			setcookie('userIdAdmin', '' . $this->user->id,  $token->expirationTime, '/');
			return $token;
		}
		// End

		public function disconnect() {
			$token = $this->removeToken();
			setcookie('userIdAdmin', '', 0, '/');
			setcookie('rememberMeAdmin', '', 0, '/');
			debug('COOKIE', $_COOKIE);
		}

		// addToken
		public function addToken() {
			$now = time();
			$code = hash('sha256', $this->user->id . SECRET . $this->user->password . $now);
			$expirationTime =  $now + (7 * 24 * 3600);

			$token = new stdClass();
			$token->code = $code;
			$token->expirationTime = $expirationTime;
			$this->user->content->tokens[] = $token;
			return $token;
		}
		// end

		public function removeToken() {
			if (!isset($_COOKIE['rememberMeAdmin'])) {
				return;
			}
			$this->user->content->tokens = array_filter($this->user->content->tokens, array($this, 'filter'));
		}

		public function filter($token) {
			if ($token->code == $_COOKIE['rememberMeAdmin']) {
				return false;
			}
			if ($token->expirationTime < time()) {
				return false;
			}
			return true;
		}

		// checkToken
		public function checkToken() {
			if (!isset($_COOKIE['rememberMeAdmin'])) {
				return true;
			}
			return false;
		}
		// end
	}

