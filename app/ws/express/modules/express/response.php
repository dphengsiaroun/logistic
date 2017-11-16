<?php

class Response {
    public $body;

    public function __construct() {
        $this->body = '';
    }
    
    public function status($code) {
        http_response_code($code);
    }

    public function send($msg) {
        $this->body .= $msg;
    }

    public function deploy() {
        echo $this->body;
    }
}

