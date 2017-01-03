<?php
/*
 * jQuery File Upload Plugin PHP Example
 * https://github.com/blueimp/jQuery-File-Upload
 *
 * Copyright 2010, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */


define("BASE_DIR", __DIR__);
require_once(BASE_DIR . "/include/account.inc.php");

debug("UPLOAD_DIR " . UPLOAD_DIR);
debug("UPLOAD_URL " . UPLOAD_URL);
debug("SESSION ", $_SESSION);
debug("POST ", $_POST);
debug("SERVER ", $_SERVER);
@debug("FILE ", $_FILES);
error_reporting(E_ALL | E_STRICT);
require(BASE_DIR . '/include/lib/UploadHandler.php');


try {
	$account = Account::getConnected();


	class MyUploadHandler extends UploadHandler
	{
		protected function get_user_id() {
			$account = Account::getConnected();
			return $account->getPictureDir();
		}
	}

	$options = array(
		'upload_dir' => UPLOAD_DIR,
		'upload_url' => UPLOAD_URL,
		'script_url' => 'ws/upload.php',
		'user_dirs' => true,
		'mkdir_mode' => 0705,
		'max_file_size' => $account->getRemainingMaxFileSize()
	);

	$upload_handler = new MyUploadHandler($options);
	debug('output', $upload_handler);
	$account->reportLoadedPicture();
	debug('done');


} catch (Exception $e) {
	$result = array('files' => array(
		array(
			'error' => $e->getMessage()
		)
	));
	echo json_encode($result);
}

