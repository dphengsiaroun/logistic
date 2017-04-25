<?php

	class EventLoader {

        public static function create($e) {
            global $db, $cfg;
			debug('$e', $e);
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

		public static function delete($e) {
			global $db, $cfg;

			$loader = Loader::retrieve($e->content->id);

			if ($e->content->accountId != $loader->accountId) {
				throw new Exceptions('Forbidden operation. Account must match.');
			}
			// On lance notre requête de vérification
			$sql = <<<EOF
DELETE FROM {$cfg->prefix}loader WHERE id=:id
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $loader->id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}
		}

		public static function update($e) {
			global $db, $cfg;

			$loader = Loader::retrieve($e->content->id);
			debug('loader to update', $loader);

			if ($e->content->accountId != $loader->accountId) {
				throw new Exceptions('Forbidden operation. Account must match.');
			}
			$sql = <<<EOF
UPDATE {$cfg->prefix}loader
SET content = :content
WHERE id = :id;
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $loader->id,
				':content' => json_encode($e->content),
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}
			debug('Loader update successfully propagated');
		}

	}

