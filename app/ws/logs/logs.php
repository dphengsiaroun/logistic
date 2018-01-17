<?php

$dir = getcwd();
print_r($dir);

function getFilesInDirectory($dir) {
    if (is_dir($dir)) {
        if ($dh = opendir($dir)) {
            while (($file = readdir($dh)) !== false) {
                if( $file != '.' && $file != '..') {
                echo "<br>$file" . "\n";
                }
            }
            closedir($dh);
        }
    }
}

getFilesInDirectory();

?>