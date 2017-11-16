<?php

class Request {

    public $url;

    public function __construct() {
        $prefixUrl = dirname($_SERVER['SCRIPT_NAME']);
        $absoluteUrl = $_SERVER['REQUEST_URI'];
        $this->url = substr($absoluteUrl, strlen($prefixUrl));
    }
    
}

