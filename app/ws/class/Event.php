<?php
	require_once(BASE_DIR . '/include/misc.inc.php');
	require_once(BASE_DIR . '/include/database.inc.php');

	foreach (glob(BASE_DIR . '/class/event/Event*.php') as $filename) {	
    	require_once($filename);
	}

	class Event {

		public function __construct($array) {
			@$this->id = $array['id'];
			@$this->type = $array['type'];
			@$this->content = $array['content'];
		}

		public static function insert($type, $content) {
			global $db, $cfg;
			debug('event insert', $content);
			$content = (object) $content;
			debug('content', $content);
			$content->created_t = time();

			$sql = <<<EOF
INSERT INTO {$cfg->prefix}event (type, content) VALUES
	(:type, :content);
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':type' => $type,
				':content' => json_encode($content)
			)) === FALSE) {
				throw new Exception('Cannot insert event: '.sprint_r($db->errorInfo()));
			}
			$id = $db->lastInsertId();
			return new Event(array(
				'id' => $id,
				'type' => $type,
				'content' => $content
			));
		}

		public static function synchronize() {
			global $db, $cfg;
			// On lance notre requête de vérification
			$sql = <<<EOF
SELECT e.id AS id FROM {$cfg->prefix}event_id e_id, {$cfg->prefix}event e WHERE e.id > e_id.id;
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array()) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			while ($array = $st->fetch()) {
				$e = new Event($array);
				$e->retrieve();
				$e->propagate();
				$e->commit();
			}
		}

		public function retrieve() {
			global $db, $cfg;
			// On lance notre requête de vérification
			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}event WHERE id = :id;
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $this->id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			if ($st->rowCount() == 0) {
				throw new Exception('Event not found for id = ' . $this->id);
			}

			$array = $st->fetch();
			$this->id = $array['id'];
			$this->type = $array['type'];
			$this->content = json_decode($array['content']);
			debug('Event retrieved.');
		}

		public function propagate() {
			global $db, $cfg;

			switch ($this->type) {
				case '/user/create':
					EventUser::create($this);
					break;
				case '/user/delete':
					EventUser::delete($this);
					break;
				case '/loader/create':
					EventLoader::create($this);
					break;
				case '/loader/delete':
					EventLoader::delete($this);
					break;
				case '/loader/update':
					EventLoader::update($this);
					break;
				case '/carrier/create':
					EventCarrier::create($this);
					break;
				case '/carrier/delete':
					EventCarrier::delete($this);
					break;
				case '/carrier/update':
					EventCarrier::update($this);
					break;
				case '/geoloc/city':
					EventGeoloc::insertCity($this);
					break;
				case '/geoloc/route':
					EventGeoloc::insertRoute($this);
					break;
				case '/proposal/create':
					EventProposal::create($this);
					break;
				case '/proposal/update':
					EventProposal::update($this);
					break;
				case '/proposal/delete':
					EventProposal::delete($this);
					break;
			}

			debug('Event propagated.');
		}

		public function commit() {
			global $db, $cfg;

			$sql = <<<EOF
UPDATE {$cfg->prefix}event_id SET id = :id;
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $this->id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			debug('Event committed.');
		}

	}

