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

define("BASE_DIR", dirname($_SERVER["SCRIPT_FILENAME"]));
require_once(BASE_DIR . "/include/constant.inc.php");
require_once(BASE_DIR . "/include/misc.inc.php");
require_once(BASE_DIR . "/include/database.inc.php");
session_start();
debug("UPLOAD_DIR " . UPLOAD_DIR);
debug("UPLOAD_URL " . UPLOAD_URL);
debug_r("SESSION ", $_SESSION);
error_reporting(E_ALL | E_STRICT);
require(BASE_DIR . '/include/lib/UploadHandler.php');
$options = array(
	'upload_dir' => UPLOAD_DIR,
	'upload_url' => UPLOAD_URL,
	'user_dirs' => true,
);

class MyUploadHandler extends UploadHandler
{

    protected function get_user_id() {
        @session_start();
        return 'acct_'.$_SESSION['accountId'];
    }
}

$upload_handler = new MyUploadHandler($options);
