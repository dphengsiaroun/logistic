<?php

	define('BASE_DIR', dirname(__DIR__));
	require_once(BASE_DIR . '/include/constant.inc.php');
	require_once(BASE_DIR . '/include/misc.inc.php');
	require_once(BASE_DIR . '/include/database.inc.php');

	$objects = array(
		'Carrier',
		'Loader',
		'User',
		'Connection',
		'Proposal'
	);

	foreach ($objects as $class) {
		require_once(BASE_DIR . '/admin/class/' . $class . '.php');
	}

	debug('toto');

	$requestUri = $_SERVER['REQUEST_URI'];
	$url = preg_replace('/^.*\/ws\/(.*?)(?:\?.*?)?$/', '$1', $requestUri);
	debug('url', $url);

	debug('$_SERVER', $_SERVER);

	$array = preg_split('/\//', $url);
	debug('$array', $array);
	if (count($array) > 2) {
		$resource = $array[1];
		debug('resource', $resource);
	} else {
		$resource = $array[1];
		debug('resource', $resource);
	}

	if (endsWith($resource, 's')) {
		$resource = substr($resource, 0, -1);
		debug('resource', $resource);
	}
	debug('resource', $resource);

	// debug('$_SERVER', $_SERVER);

	$method = $_SERVER['REQUEST_METHOD'];
	debug('method', $method);

	$id = NULL;

	if (count($array) == 4) {
		$id = $array[3];
		debug('valeur de id', $id);
	} elseif (count($array) == 3) {
		$id = $array[2];
	}
	debug('Coucou');
	function run($resource, $method, $id) {
		global $result;
		$class = ucfirst($resource);
		debug('Coucou 3', $class);
		$obj = new $class();
		debug('Coucou 4', $obj);
		debug('Coucou 4.1', $method);
		debug('Coucou 4.2', $id);
		if ($method == 'GET') {
			if ($id) {
				debug('Coucou 5', $result);
				$result[$resource] = $obj->retrieve($id);
				debug('Coucou 6', $result[$resource]);				
				return;
			}
			$result[$resource . 's'] = $obj->listAll();
			debug('fais moi un listAll()');
			return;
		}
		if ($method == 'POST') {
			debug('Method === POST');
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
		debug('Coucou 2');
		run($resource, $method, $id);
	} catch (Exception $e) {
			$result['status'] = 'ko';
			$result['errorMsg'] = $e->getMessage();
			$result['errorCode'] = $e->getCode();
		}
	echo json_encode($result);

?>
