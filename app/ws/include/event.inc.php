<?php

	require_once(BASE_DIR . "/include/account.inc.php");

	class Event {

		public function __construct($type, $content) {
			$this->type = $type;
			$this->content = $content;
			$this->insert();
		}

		public function insert() {
			global $db, $cfg;

			$sql = <<<EOF
INSERT INTO {$cfg->prefix}event (type, content) VALUES
	(:type, :content);
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':type' => $this->type,
				':content' => json_encode($this->content)
			)) === FALSE) {
				throw new Exception('Cannot insert event: '.sprint_r($db->errorInfo()));
			}
			$this->id = $db->lastInsertId();
		}

		public static function synchronize() {
			global $db, $cfg;
			// On lance notre requête de vérification
			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}event_id e_id, {$cfg->prefix}event e WHERE e.id > e_id.id;
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array()) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			while ($array = $st->fetch()) {
				$e = new Event($array);
				$e->propagate();
			}
			return $loader;
		}

	}

