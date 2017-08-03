<?php

class EventUser {

	public static function create($e) {
		global $db, $cfg;
		debug('EventUser create', $e);
		$sql = <<<EOF
INSERT INTO {$cfg->prefix}user (id, email, password, content) VALUES
	(:id, :email, :password, :content);
EOF;

		$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':id' => $e->id,
			':email' => $e->content->email,
			':password' => $e->content->password,
			':content' => json_encode($e->content->content)
		)) === FALSE) {
			throw new Exception('Cannot insert event: '.sprint_r($db->errorInfo()));
		}
		debug('EventUser create done');
	}
}
