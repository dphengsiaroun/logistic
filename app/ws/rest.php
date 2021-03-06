<?php

	define('BASE_DIR', __DIR__);
	require_once(BASE_DIR . '/include/constant.inc.php');
	require_once(BASE_DIR . '/include/misc.inc.php');
	require_once(BASE_DIR . '/include/database.inc.php');

	$objects = array(
		'Carrier',
		'Loader',
		'Truck',
		'User',
		'Connection',
		'Proposal',
		'Synchronize'
	);

	foreach ($objects as $class) {
		require_once(BASE_DIR . '/class/' . $class . '.php');
	}

	$requestUri = $_SERVER['REQUEST_URI'];
	$url = preg_replace('/^.*\/ws\/(.*?)(?:\?.*?)?$/', '$1', $requestUri);
	debug('url', $url);

	debug('$_SERVER', $_SERVER);

	$array = preg_split('/\//', $url);

	if (count($array) > 2) {
		$resource = $array[2];
		debug('resource', $resource);
	} else {
		$resource = $array[0];
		debug('resource', $resource);
	}

	if (endsWith($resource, 's')) {
		$resource = substr($resource, 0, -1);
	}
	debug('resource', $resource);

	// debug('$_SERVER', $_SERVER);

	$method = $_SERVER['REQUEST_METHOD'];
	debug('method', $method);

	$id = NULL;

	if (count($array) == 4) {
		$id = $array[3];
		debug('valeur de id', $id);
	} elseif (count($array) == 2) {
		$id = $array[1];
	}
	function run($resource, $method, $id) {
		global $result;
		$class = ucfirst($resource);
		$obj = new $class();
		if ($method == 'GET') {
			if ($id) {
				$result[$resource] = $obj->retrieve($id);
				return;
			}
			$result[$resource . 's'] = $obj->listAll();
			return;
		}
		if ($method == 'POST') {
			$result[$resource] = $obj->create();
			return;
		}
		if ($method == 'PUT') {
			$result[$resource] = $obj->update($id);
			return;
		} 
		if ($method == 'PATCH') {
			if (!method_exists($obj, 'patch')) {
				throw new Exception(ERROR_NO_PATCH_METHOD_MSG, ERROR_NO_PATCH_METHOD_CODE);
			}
			$result[$resource] = $obj->patch($id);
			debug('$result', $result);
			debug('$resource', $resource);
			return;
		}
		if ($method == 'DELETE') {
			$obj->delete($id);
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
