<?php 

function sprint_r($var) {
    ob_start();
    print_r($var);
    $output=ob_get_contents();
    ob_end_clean();
    return $output;
}
