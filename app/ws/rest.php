<?php

	define('BASE_DIR', __DIR__);
	require_once(BASE_DIR . '/include/constant.inc.php');
	require_once(BASE_DIR . '/include/misc.inc.php');
	require_once(BASE_DIR . '/include/database.inc.php');

	$objects = array(
		'carrier',
		'loader'
	);

	foreach ($objects as $class) {
		require_once(BASE_DIR . '/include/' . $class . '.inc.php');
	}

	$requestUri = $_SERVER['REQUEST_URI'];
	$url = preg_replace('/^.*\/ws\/(.*?)(?:\?.*?)?$/', '$1', $requestUri);
	debug('url', $url);

	// debug('$_SERVER', $_SERVER);

	$array = preg_split('/\//', $url);

	$resource = $array[0];
	debug('resource', $resource);
	if (endsWith($resource, 's')) {
		$resource = substr($resource, 0, -1);
	}
	debug('resource', $resource);

	// debug('$_SERVER', $_SERVER);

	$method = $_SERVER['REQUEST_METHOD'];
	debug('method', $method);

	$id = NULL;

	if (count($array) > 1) {
		$id = $array[1];
	}



	function run($resource, $method, $id) {
		global $result;
		$class = ucfirst($resource);
		if ($method == 'GET') {
			if ($id) {
				$result[$resource] = $class::retrieve($id);
				return;
			}
			$result[$resource . 's'] = $class::listAll();
			return;
		}
		if ($method == 'POST') {
			$result[$resource] = $class::create();
			return;
		}
		// } elseif ($method == 'PUT') {

		// } elseif ($method == 'PATCH') {

		if ($method == 'DELETE') {
			$class::delete($id);
			return;
		}
	}

	$result = [];
	$result['status'] = 'ok';
	try {
		run($resource, $method, $id);
	} catch (Exception $e) {
			$result['status'] = 'ko';
			$result['errorMsg'] = $e->getMessage();
			$result['errorCode'] = $e->getCode();
		}
	echo json_encode($result);

?>
