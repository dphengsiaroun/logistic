<?php

class EventUser {

	public static function create($e) {
		global $db, $cfg;
		debug('EventUser create', $e);
		// For test only account with login = tutu will fail.
		if ($e->content->content->login === 'tutu') {
			throw new Exception('Cannot create account with login = tutu');
		}
 		$sql = <<<EOF
INSERT INTO {$cfg->prefix}user (id, created_t, email, login, phone, password, content) VALUES
	(:id, :created_t, :email, :login, :phone, :password, :content);
EOF;

		$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':id' => $e->id,
			':created_t' => $e->content->created_t,
			':email' => $e->content->email,
			':login' => $e->content->content->login,
			':phone' => $e->content->content->phone,
			':password' => $e->content->password,
			':content' => json_encode($e->content->content)
		)) === FALSE) {
			throw new Exception('Cannot insert event: '.sprint_r($db->errorInfo()));
		}
		debug('EventUser create done');
	}

	public function update($e) {
		global $db, $cfg;

		$sql = <<<EOF
UPDATE {$cfg->prefix}user
SET email = :email, login=:login, phone=:phone, password = :password, content = :content
WHERE id = :id
EOF;

		$st = $db->prepare($sql,
			array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':email' => $e->content->email,
			':login' => $e->content->content->login,
			':phone' => $e->content->content->phone,
			':password' => $e->content->password,
			':content' => json_encode($e->content->content),
			':id' => $e->content->id
		)) === FALSE) {
			throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
		}
	}

	public function delete($e) {
		global $db, $cfg;
		debug('$e->id', $e);
		$sql = <<<EOF
DELETE FROM {$cfg->prefix}user
WHERE id = :id;
EOF;

		$st = $db->prepare($sql,
				array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':id' => $e->content->id,
		)) === FALSE) {
			throw new Exception('Cannot delete user : '.sprint_r($db->errorInfo()));
		}
		debug("delete user ok");
	}

	public function deleteProposal($e) {
			global $db, $cfg;
			debug('$e->id', $e);
			$sql = <<<EOF
DELETE FROM {$cfg->prefix}proposal
WHERE user_id = :id;
EOF;
	
			$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $e->content->id,
			)) === FALSE) {
				throw new Exception('Cannot delete user proposal: '.sprint_r($db->errorInfo()));
			}
			debug("delete user proposal ok");
	}

	public function deleteLoader($e) {
		global $db, $cfg;
		debug('$e->id', $e);
		$sql = <<<EOF
DELETE FROM {$cfg->prefix}loader
WHERE user_id = :id;
EOF;

		$st = $db->prepare($sql,
				array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':id' => $e->content->id,
		)) === FALSE) {
			throw new Exception('Cannot delete user loader ad: '.sprint_r($db->errorInfo()));
		}
		debug("delete user loader ad ok");
	}

	public function deleteCarrier($e) {
		global $db, $cfg;
		debug('$e->id', $e);
		$sql = <<<EOF
DELETE FROM {$cfg->prefix}carrier
WHERE user_id = :id;
EOF;

		$st = $db->prepare($sql,
				array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':id' => $e->content->id,
		)) === FALSE) {
			throw new Exception('Cannot delete user carrier ad: '.sprint_r($db->errorInfo()));
		}
		debug("delete user carrier ad ok");
	}
}

