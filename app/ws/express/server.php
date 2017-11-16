<?php

require(__DIR__ . '/modules/express/index.php');
require(__DIR__ . '/modules/log/index.php');

$app = new Express();
$app->use(function($req, $res, $next) {
    global $console;
    $console->log('$req->url', $req->url);
    $res->send("Coucou: $req->url");
});

$app->run();
