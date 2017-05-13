<?php

	class EventCarrier {

        public static function create($e) {
            global $db, $cfg;

			$sql = <<<EOF
INSERT INTO {$cfg->prefix}carrier (id, account_id, content) VALUES
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

			$carrier = Carrier::retrieve($e->content->id);

			if ($e->content->accountId != $carrier->accountId) {
				throw new Exceptions('Forbidden operation. Account must match.');
			}
			// On lance notre requête de vérification
			$sql = <<<EOF
DELETE FROM {$cfg->prefix}carrier WHERE id=:id
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $carrier->id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}
		}

		public static function update($e) {
			global $db, $cfg;

			$carrier = Carrier::retrieve($e->content->id);
			debug('carrier to update', $carrier);

			if ($e->content->accountId != $carrier->accountId) {
				throw new Exceptions('Forbidden operation. Account must match.');
			}
			$sql = <<<EOF
UPDATE {$cfg->prefix}carrier
SET content = :content
WHERE id = :id;
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $carrier->id,
				':content' => json_encode($e->content),
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}
			debug('Carrier update successfully propagated');
		}

	}
