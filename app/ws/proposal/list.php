<?php

	define('BASE_DIR', dirname(__DIR__));
	require_once(BASE_DIR . '/include/proposal.inc.php');

	$request = getRequest();

	debug('list proposal start', $request);

	$result = [];
	try {
		$proposals = Proposal::listAll($request);

		$result['status'] = 'ok';
		$result['proposals'] = $proposals;

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);
?>
