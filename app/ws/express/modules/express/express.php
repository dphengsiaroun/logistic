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
    }

    public function use() {
        $numargs = func_num_args();
        if ($numargs === 1) {
            $middleware = func_get_arg(0);
            
            array_push($this->middlewares, $middleware);
           
            return;
        }
        if ($numargs === 2) {
            $prefixUrl = '/logistic/app/ws/express';
            $url = $_SERVER['REQUEST_URI'];
            $prefix = $prefixUrl . func_get_arg(0);
           
            
            if (substr($url, 0, strlen($prefix)) !== $prefix) {
                return;
            }
            $newUrl = substr($url, strlen($prefix));

            $mw = func_get_arg(1);
            $middleware = function($req, $res, $next) use ($mw, $newUrl) {
                $req = new Request();
                $req->url = $newUrl;
                $mw($req, $res, $next);
            };
            array_push($this->middlewares, $middleware);
            return;
        }
        
    }

    public function run() {
        $this->use(function($req, $res, $next) {
            $res->status(404);
            $res->send('Not found...');
        });
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