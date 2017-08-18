<?php

define("BASE_DIR", __DIR__);
require_once(BASE_DIR . "/class/User.php");

error_reporting(E_ALL | E_STRICT);

debug('$_SERVER', $_SERVER);
debug('$_FILES', $_FILES);
debug('$_FILES[myFile][name]', $_FILES['myFile']['name']);
echo 'Success';

