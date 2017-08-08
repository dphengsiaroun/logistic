<?php
	require_once(BASE_DIR . "/include/constant.inc.php");
	require_once(BASE_DIR . '/vendor/phpmailer/phpmailer/PHPMailerAutoload.php');

	class TestMail extends PHPMailer {

		public static function isProtractor() {
			global $cfg;

			if ($cfg->smtpServerFrom === 'protractor@test.com') {
				return true;
			}
			return false;
		}


		public function send() {
			debug('Protractor Mail sent');
			file_put_contents(TEST_MAIL_FORGOTTEN_PASSWORD, $this->Body);
			return true;
		}
	}

