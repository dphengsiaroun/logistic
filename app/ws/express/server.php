<?php

require_once(__DIR__ . '/modules/express/index.php');
require_once(__DIR__ . '/../JLG/Console.php');

$console = new Console(__DIR__ . '/../logs/express.log');

$app = new Express();

$app->use('/toto', function($req, $res, $next) {
    global $console;
    $console->log('$req->url', $req->url);
    $res->send("toto: $req->url");
    $next();
});

$app->use(function($req, $res, $next) {
    global $console;
    $console->log('$req->url', $req->url);
    $res->send("Coucoux: $req->url");
});

$console->log('$_SERVER', $_SERVER);


$app->run();
