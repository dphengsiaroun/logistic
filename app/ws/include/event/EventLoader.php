<?php

	require_once(BASE_DIR . '/include/event/EventLoader.php');

	class EventLoader {

        public static function create($e) {
            global $db, $cfg;

			$sql = <<<EOF
INSERT INTO {$cfg->prefix}loader (id, account_id, content) VALUES
	(:id, :account_id, :content);
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $e->id,
                ':account_id' => $e->content->accountId,
				':content' => json_encode($e->content)
			)) === FALSE) {
				throw new Exception('Cannot insert event: '.sprint_r($db->errorInfo()));
			}
        }

	}

