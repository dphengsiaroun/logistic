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
	foreach(glob("./*") as $file) {
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