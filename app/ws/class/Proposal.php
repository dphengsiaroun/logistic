<?php

require_once(BASE_DIR . "/class/RestResource.php");

class Proposal extends RestResource {

    public function create() {
        $proposal = parent::create();
		$user = new User();
		$user->retrieve($proposal->content->adAccountId);
		sendmail($user, 'proposal-send', $proposal);
		debug('Mail sent');
    }
}

