<?php
	require_once(BASE_DIR . "/admin/class/User.php");
	require_once(BASE_DIR . "/class/Image.php");

	class Proposal {

		public function listAll() {
			global $db, $cfg;

			$sql = <<<EOF
SELECT 
	p.*, 
	u1.login as `from`,
	u2.login as `to`
FROM 
	{$cfg->prefix}proposal p, 
	{$cfg->prefix}user u1,
	{$cfg->prefix}user u2
WHERE 
	u1.id = p.user_id
	AND u2.id = p.ad_user_id
EOF;
			$array = array();

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute($array) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}
			$result = array();

			while ($array = $st->fetch()) {
				$array['content'] = json_decode($array['content']);
				$result[] = $array;
			}
			return $result;
		}

		public static function delete($id) {
			global $db, $cfg;

			$request = new stdClass();
			$request->id = $id;
			debug('$request', $request);
			
			// On lance notre requête de vérification
			$sql = <<<EOF
DELETE FROM {$cfg->prefix}proposal WHERE id=:id
EOF;
	
			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $request->id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}
		}
	}

