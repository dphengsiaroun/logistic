<?php
require_once(__DIR__ . '/../vendor/autoload.php');
require_once(__DIR__ . '/global.php');


class Console {

    public function __construct($path = __DIR__ . '/../logs/trace.log') {
        $this->log = new Monolog\Logger('log');
        $stream = new Monolog\Handler\StreamHandler($path, Monolog\Logger::DEBUG);
        $format = "[%datetime%] %channel%.%level_name%: %message% \n";
        $formatter = new Monolog\Formatter\LineFormatter($format, null, true);
        $stream->setFormatter($formatter);
        $this->log->pushHandler($stream);
    }

    public function log($msg, $object = NULL) {
        $e = new Exception("");
        $traces = $e->getTrace();
        $line = $traces[0]['line'];
        $filename = $traces[0]['file'];
        $message = $filename . ':' . $line . ":\n" . $msg;
        if ($object == NULL) {
            $this->log->addDebug($message);
            return;
        }
        $this->log->addDebug($message . " " . sprint_r($object));
    }
}

