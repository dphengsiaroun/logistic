<?php

	require_once(BASE_DIR . "/include/account.inc.php");
	require_once(BASE_DIR . "/include/event.inc.php");

	class Loader {

		public static function create($account, $request) {
			$request->accountId = $account->id;
			self::manageSessionImage($account, $request);
			$e = Event::insert('/loader/create', $request);
			Event::synchronize();
			$loader = self::retrieve($e->id);
			return $loader;
		}

		public static function retrieve($id) {
			global $db, $cfg;
			// On lance notre requête de vérification
			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}loader WHERE id=:id
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
				':id' => $id
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			if ($st->rowCount() == 0) {
				throw new Exception('Loader not found for id = ' . $id);
			}

			$array = $st->fetch();
			$loader = new Loader();
			$loader->id = $array['id'];
			$loader->accountId = $array['account_id'];
			$loader->content = json_decode($array['content']);
			debug('Loader retrieved.');
			return $loader;
		}

		public static function listAll() {
			global $db, $cfg;
			// On lance notre requête de vérification
			$sql = <<<EOF
SELECT * FROM {$cfg->prefix}loader
EOF;

			$st = $db->prepare($sql,
						array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
			if ($st->execute(array(
			)) === FALSE) {
				throw new Exception('MySQL error: ' . sprint_r($db->errorInfo()));
			}

			$result = array();

			while ($array = $st->fetch()) {
				$array['content'] = json_decode($array['content']);
				$result[$array['id']] = $array;
			}
			return $result;
		}

		public static function delete($account, $request) {
			$request->accountId = $account->id;
			$e = Event::insert('/loader/delete', $request);
			Event::synchronize();
		}

		public static function update($account, $request) {
			$request->accountId = $account->id;
			$e = Event::insert('/loader/update', $request);
			Event::synchronize();
			$loader = self::retrieve($request->id);
			return $loader;
		}

		public static function manageSessionImage($account, $request) {
			// TODO: Gérer le probleme de la localisation de l'image qui pourrait être en session'
			debug('manageSessionImage $request', $request);
			if (!property_exists($request, 'userNotConnected')) {
				debug('manageSessionImage $request user connected');
				return;
			}
			unset($request->userNotConnected);
			debug('manageSessionImage $request user not connected');
			if (!property_exists($request, 'image')) {
				debug('manageSessionImage $request image not loaded');
				return;
			}
			$imageName = $request->image->name;
			debug('manageSessionImage $imageName', $imageName);
			$dirname = dirname($request->image->url);
			debug('manageSessionImage $dirname', $dirname);
			$session = basename($dirname);
			debug('manageSessionImage $session', $session);
			$sessionDirectory = $session;
			debug('manageSessionImage $sessionDirectory', $sessionDirectory);
			$imageDirectory = 'acct_' . $account->id . '_ad' . $request->imageId;
			debug('manageSessionImage $imageDirectory', $imageDirectory);
			$status = @rename(UPLOAD_DIR . $sessionDirectory, UPLOAD_DIR . $imageDirectory);
			debug('manageSessionImage rename', $status);
			$request->image->url = UPLOAD_URL . $imageDirectory . '/' . $imageName;
			$request->image->thumbnailUrl = UPLOAD_URL . $imageDirectory . '/thumbnail/' . $imageName;
			debug('manageSessionImage $request->image', $request->image);
		}
	}

