<?php

define("BASE_DIR", __DIR__);
require_once(BASE_DIR . "/class/Account.php");

error_reporting(E_ALL | E_STRICT);
require(BASE_DIR . '/include/lib/UploadHandler.php');

class MyUploadHandler extends UploadHandler {
	protected function get_user_id() {
		$account = Account::getConnected();
		return $account->getPictureDir();
	}
}

class MySessionUploadHandler extends UploadHandler {
	protected function get_user_id() {
		return 'session_' . session_id();
	}
}

$options = array(
	'upload_dir' => UPLOAD_DIR,
	'upload_url' => UPLOAD_URL,
	'script_url' => 'ws/upload.php',
	'user_dirs' => true,
	'mkdir_mode' => 0705,
);

try {
	if (Account::isConnected()) {
		$account = Account::getConnected();
		$options['max_file_size'] = $account->getRemainingMaxFileSize();
		$upload_handler = new MyUploadHandler($options);
		debug('output', $upload_handler);
		$account->reportLoadedPicture();
		debug('done');
	} else {
		$options['max_file_size'] = MAX_PICTURE_SIZE_PER_ANONYMOUS_SESSION;
		$upload_handler = new MySessionUploadHandler($options);
		debug('output', $upload_handler);
		debug('done');
	}



} catch (Exception $e) {
	$result = array(
		'files' => array(
			array(
				'error' => $e->getMessage()
			)
		)
	);
	echo json_encode($result);
}

