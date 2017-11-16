<?php
$loader = require(__DIR__ . '/../vendor/autoload.php');
$loader->addPsr4('JLG\\', __DIR__ . '/../JLG/');

require_once(__DIR__ . '/modules/express/index.php');
use JLG;
$console = new JLG\Console(__DIR__ . '/../logs/express.log');
$console->log('test');

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
