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
INSERT INTO {$cfg->prefix}user (id, email, login, phone, password, content) VALUES
	(:id, :email, :login, :phone, :password, :content);
EOF;

		$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':id' => $e->id,
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
	}

