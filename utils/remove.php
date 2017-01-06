<?php

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

function removeAll() {
	foreach(glob('./' . '{,.}[!.,!..]*',GLOB_MARK|GLOB_BRACE) as $file) {
		 echo "file = $file\n";
		if (is_dir($file)) {
			recursiveRemoveDirectory($file);
		} else {
			unlink($file);
		}
	}
}

    removeAll();
    echo "Successfully removed.\n";



?>