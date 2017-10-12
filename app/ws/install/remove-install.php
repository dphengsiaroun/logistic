<?php

define("BASE_DIR", dirname(dirname($_SERVER["SCRIPT_FILENAME"])));
require_once(BASE_DIR . "/include/constant.inc.php");
require_once(BASE_DIR . "/include/misc.inc.php");

debug("start remove");

function recursiveRemoveDirectory($directory) {
	foreach(glob("{$directory}/*") as $file) {
		if (is_dir($file)) {
			recursiveRemoveDirectory($file);
		} else {
			unlink($file);
		}
	}
	rmdir($directory);
}

recursiveRemoveDirectory(INSTALL_DIR);
    echo "Successfully removed.\n";

header("Status: 301 Moved Permanently", false, 301);
header("Location: ../../");
exit();

