<?php

	class EventProposal {

        public static function create($e) {
            global $db, $cfg;

			$sql = <<<EOF
INSERT INTO {$cfg->prefix}proposal (id, account_id, content) VALUES
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

			$proposal = Proposal::retrieve($e->content->id);

			if ($e->content->accountId != $proposal->accountId) {
				throw new Exceptions('Forbidden operation. Account must match.');
			}
			// On lance notre requête de vérification
			$sql = <<<EOF
DELETE FROM {$cfg->prefix}proposal WHERE id=:id
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $proposal->id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}
		}

		public static function update($e) {
			global $db, $cfg;

			$proposal = Proposal::retrieve($e->content->id);
			debug('proposal to update', $proposal);

			if ($e->content->accountId != $proposal->accountId) {
				throw new Exceptions('Forbidden operation. Account must match.');
			}
			$sql = <<<EOF
UPDATE {$cfg->prefix}proposal
SET content = :content
WHERE id = :id;
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $proposal->id,
				':content' => json_encode($e->content),
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}
			debug('Proposal update successfully propagated');
		}

	}

