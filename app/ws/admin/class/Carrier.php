<?php
	require_once(BASE_DIR . "/admin/class/User.php");
	require_once(BASE_DIR . "/class/Image.php");

	class Carrier {

		public function listAll() {
			global $db, $cfg;

			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}carrier
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

		public function delete($id) {
			$request = new stdClass();
			$request->id = $id;
			$user = User::getConnected();
			$request->userId = $user->id;
		}
	}

