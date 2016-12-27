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
require __DIR__ . '/vendor/autoload.php';
require_once(BASE_DIR . "/include/constant.inc.php");
require_once(BASE_DIR . "/include/misc.inc.php");
require_once(BASE_DIR . "/include/database.inc.php");
require_once(BASE_DIR . "/include/account.inc.php");

$log = new Monolog\Logger('name');
$log->pushHandler(new Monolog\Handler\StreamHandler(__DIR__ . '/monolog.log', Monolog\Logger::WARNING));
$log->addWarning('Foo');


debug('log', $log);

debug("UPLOAD_DIR " . UPLOAD_DIR);
debug("UPLOAD_URL " . UPLOAD_URL);
debug("SESSION ", $_SESSION);
debug("POST ", $_POST);
debug("SERVER ", $_SERVER);
@debug("FILE ", $_FILES);
error_reporting(E_ALL | E_STRICT);
require(BASE_DIR . '/include/lib/UploadHandler.php');


try {
	$account = new Account();


	class MyUploadHandler extends UploadHandler
	{
		protected function get_user_id() {
			return Account::getPictureDir();
		}
	}

	$options = array(
		'upload_dir' => UPLOAD_DIR,
		'upload_url' => UPLOAD_URL,
		'user_dirs' => true,
		'mkdir_mode' => 0700,
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

