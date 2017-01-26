<?php

	class EventGeoloc {

        public static function insertCity($e) {
            global $db, $cfg;

			$sql = <<<EOF
INSERT INTO {$cfg->prefix}geoloc (`id`, `type`, `key`, `content`) VALUES
	(:id, :type, :key, :content);
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $e->id,
                ':type' => 'city',
				':key' => $e->content->key,
				':content' => json_encode($e->content->result)
			)) === FALSE) {
				throw new Exception('Cannot insert event: '.sprint_r($db->errorInfo()));
			}
		}

		public static function insertRoute($e) {
            global $db, $cfg;

			$sql = <<<EOF
INSERT INTO {$cfg->prefix}geoloc (`id`, `type`, `key`, `content`) VALUES
	(:id, :type, :key, :content);
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $e->id,
                ':type' => 'route',
				':key' => $e->content->key,
				':content' => json_encode($e->content->result)
			)) === FALSE) {
				throw new Exception('Cannot insert event: '.sprint_r($db->errorInfo()));
			}
		}

	}

