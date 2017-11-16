<?php

require(__DIR__ . '/modules/express/index.php');

$app = new Express();
$app->use(function($req, $res, $next) {
    $res->send("Coucou: $req->url");
});

$app->run();
