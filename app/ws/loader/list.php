<?php

	define('BASE_DIR', dirname(__DIR__));
	require_once(BASE_DIR . '/include/loader.inc.php');

	$request = getRequest();

	debug('list truck start', $request);

	$result = [];
	try {
		$loaders = Loader::listAll($request);

		$result['status'] = 'ok';
		$result['loaders'] = $loaders;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
