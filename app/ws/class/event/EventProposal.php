<?php

require_once(BASE_DIR . "/include/mail.inc.php");

class EventProposal {

	public static function create($e) {
		global $db, $cfg;
		debug('$e', $e);
		$sql = <<<EOF
INSERT INTO {$cfg->prefix}proposal (id, user_id, ad_id, ad_user_id, ad_type, content) VALUES
(:id, :user_id, :ad_id, :ad_user_id, :ad_type, :content);
EOF;

		$st = $db->prepare($sql,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
		if ($st->execute(array(
			':id' => $e->id,
			':user_id' => $e->content->userId,
			':ad_id' => $e->content->adId,
			':ad_user_id' => $e->content->adAccountId,
			':ad_type' => $e->content->adType,
			':content' => json_encode($e->content),
		)) === FALSE) {
			throw new Exception('Cannot insert event: '.sprint_r($db->errorInfo()));
		}
	}

	public static function delete($e) {
		global $db, $cfg;
		$obj = new Proposal();
		$proposal = $obj->retrieve($e->content->id);

		if ($e->content->userId != $proposal->userId) {
			throw new Exceptions('Forbidden operation. User must match.');
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
		$obj = new Proposal();
		$proposal = $obj->retrieve($e->content->id);
		debug('proposal to update', $proposal);

		if ($e->content->userId != $proposal->userId) {
			throw new Exceptions('Forbidden operation. User must match.');
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
