<?php

	class Log {

		public function listAll() {
			global $cfg;

			$dir = BASE_DIR . '/logs';

			$result = array();

			if (is_dir($dir)) {
				if ($dh = opendir($dir)) {
					while (($file = readdir($dh)) !== false) {
						if( $file != '.' && $file != '..') {
							$path = "toto/logs/" . $file;
							$result[] = array(
								'name' => $file,
								'path' => $path
							);
						}
					}
					closedir($dh);
				}
			}
			return $result;
		}
	
	}
