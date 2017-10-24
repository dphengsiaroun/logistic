<?php

	require_once(BASE_DIR . "/class/User.php");

	class RememberMe {

		public function __construct($user) {
			if (!property_exists($user->content, 'tokens')) {
				$user->content->tokens = array();
				$user->update();
			}
			$this->user = $user;
		}

		public function connect() {
			$token = $this->addToken();
			debug('token', $token);
			setcookie('rememberMe', $token->code,  $token->expirationTime, '/');
			setcookie('userId', '' . $this->user->id,  $token->expirationTime, '/');
			return $token;
		}

		public function disconnect() {
			$token = $this->removeToken();
			setcookie('userId', '', 0, '/');
			setcookie('rememberMe', '', 0, '/');
			debug('COOKIE', $_COOKIE);
		}

		public function addToken() {
			$now = time();
			$code = hash('sha256', $this->user->id . SECRET . $this->user->password . $now);
			$expirationTime =  $now + (7 * 24 * 3600);

			$token = new stdClass();
			$token->code = $code;
			$token->expirationTime = $expirationTime;
			$this->user->content->tokens[] = $token;
			$this->user->update();
			return $token;
		}

		public function removeToken() {
			if (!isset($_COOKIE['rememberMe'])) {
				return;
			}
			$this->user->content->tokens = array_filter($this->user->content->tokens, array($this, 'filter'));
			$this->user->update();
		}

		public function filter($token) {
			if ($token->code == $_COOKIE['rememberMe']) {
				return false;
			}
			if ($token->expirationTime < time()) {
				return false;
			}
			return true;
		}

		public function checkToken() {
			if (!isset($_COOKIE['rememberMe'])) {
				return false;
			}
			foreach ($this->user->content->tokens as $token) {
				if ($token->code == $_COOKIE['rememberMe'] && $token->expirationTime > time()) {
					return true;
				}
			}
			return false;
		}
	}

