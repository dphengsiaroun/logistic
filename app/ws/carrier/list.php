<?php

	define('BASE_DIR', dirname(__DIR__));
	require_once(BASE_DIR . '/include/carrier.inc.php');

	$request = getRequest();

	debug('list carrier start', $request);

	$result = [];
	try {
		$carriers = Carrier::listAll($request);

		$result['status'] = 'ok';
		$result['carriers'] = $carriers;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
