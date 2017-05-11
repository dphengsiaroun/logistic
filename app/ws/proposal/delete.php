<?php

	define("BASE_DIR", dirname(__DIR__));
	require_once(BASE_DIR . "/include/proposal.inc.php");

	$request = getRequest();
	debug("delete proposal start");
	debug('request', $request);

	$result = [];
	try {
		$account = Account::getConnected();
		Proposal::delete($account, $request);

		$result['status'] = 'ok';

	} catch (Exception $e) {
		$result['status'] = 'ko';
		$result['errorMsg'] = $e->getMessage();
		$result['errorCode'] = $e->getCode();
	}
	echo json_encode($result);