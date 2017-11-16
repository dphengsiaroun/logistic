<?php

class Express {

    public $req;
    public $res;
    public $next;


    public function __construct() {
        $this->req = new Request();
        $this->res = new Response();
        $this->middlewares = array();
        $this->i = 0;
        $this->use(function($req, $res, $next) {
            $res->status(404);
            $res->send('Not found...');
        });
    }

    public function use($middleware) {
        array_unshift($this->middlewares, $middleware);
    }

    public function run() {
        $this->next();
        $this->res->deploy();
    }

    public function next() {
        $middleware = $this->middlewares[$this->i];
        $this->i++;
        $middleware($this->req, $this->res, function() {
            $this->next();
        });
    }
}