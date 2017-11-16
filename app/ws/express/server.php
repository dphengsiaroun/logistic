<?php

require(__DIR__ . '/modules/express/index.php');
require(__DIR__ . '/modules/log/index.php');

$app = new Express();

$app->use('/toto', function($req, $res, $next) {
    global $console;
    $console->log('$req->url', $req->url);
    $res->send("toto: $req->url");
});

$app->use(function($req, $res, $next) {
    global $console;
    $console->log('$req->url', $req->url);
    $res->send("Coucoux: $req->url");
});


$app->run();
