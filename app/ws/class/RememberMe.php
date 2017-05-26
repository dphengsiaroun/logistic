<?php

	require_once(BASE_DIR . "/class/User.php");

	class RememberMe {

		public function __construct($account) {
			if (!property_exists($account->content, 'tokens')) {
				$account->content->tokens = array();
				$account->save();
			}
			$this->account = $account;
		}

		public function connect() {
			$token = $this->addToken();
			debug('token', $token);
			setcookie('rememberMe', $token->code,  $token->expirationTime, '/');
			setcookie('accountId', '' . $this->account->id,  $token->expirationTime, '/');
		}

		public function disconnect() {
			$token = $this->removeToken();
			setcookie('accountId', '', 0, '/');
			setcookie('rememberMe', '', 0, '/');
			debug('COOKIE', $_COOKIE);
		}

		public function addToken() {
			$now = time();
			$code = hash('sha256', $this->account->id . SECRET . $this->account->password . $now);
			$expirationTime =  $now + (7 * 24 * 3600);

			$token = new stdClass();
			$token->code = $code;
			$token->expirationTime = $expirationTime;
			$this->account->content->tokens[] = $token;
			$this->account->save();
			return $token;
		}

		public function removeToken() {
			if (!isset($_COOKIE['rememberMe'])) {
				return;
			}
			$this->account->content->tokens = array_filter($this->account->content->tokens, array($this, 'filter'));
			$this->account->save();
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
			foreach ($this->account->content->tokens as $token) {
				if ($token->code == $_COOKIE['rememberMe'] && $token->expirationTime > time()) {
					return true;
				}
			}
			return false;
		}
	}

