<?php
require_once(__DIR__ . '/../../../vendor/autoload.php');

function sprint_r($var) {
    ob_start();
    print_r($var);
    $output=ob_get_contents();
    ob_end_clean();
    return $output;
}

class Console {

    public function __construct() {
        $this->log = new Monolog\Logger('log');
        $stream = new Monolog\Handler\StreamHandler(__DIR__ . '/trace.log', Monolog\Logger::DEBUG);
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

$console = new Console();
