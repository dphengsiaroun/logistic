<?php

	class LogLevel {

		public function update() {
			global $cfg;

			$request = getRequest();
			$logLevel = 'DEBUG';

			debug('request', $request);
			$filename = BASE_DIR . '/include/settings.inc.php';
			$content = file_get_contents($filename);
			debug('content', $content);
			debug('$request->level', $request->level);
			switch ($request->level) {
				case 'Debug':
					$logLevel = 'DEBUG';
					break;
				case 'Warning':
					$logLevel = 'WARNING';
					break;
				case 'Error':
					$logLevel = 'ERROR';
					break;
				default:
					debug('go to error: ', $request->level);
					throw new Exception('Bad log level: ' . $request->level);
			}
			$content = preg_replace('/::.*\)/', "::$logLevel)", $content);
			debug('content', $content);
			file_put_contents ($filename, $content);
			$result = array();
			return $result;
		}

		public function listAll() {
			global $cfg;
			debug('logLevel listAll');
			$filename = BASE_DIR . '/include/settings.inc.php';
			$content = file_get_contents($filename);
			$logLevel = preg_replace('/^.*::(.*)\).*$/s', '$1', $content);
			debug('logLevel', $logLevel);
			switch ($logLevel) {
				case 'DEBUG':
					$logLevel = 'Debug';
					break;
				case 'WARNING':
					$logLevel = 'Warning';
					break;
				case 'ERROR':
					$logLevel = 'Error';
					break;
				default:
					debug('go to error: ', $request->level);
					throw new Exception('Bad log level: ' . $request->level);
			}
			$result = array(
				'level' => $logLevel
			);
			return $result;
		}
	
	}
