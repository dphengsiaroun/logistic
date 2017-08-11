<?php

require_once(BASE_DIR . '/vendor/phpmailer/phpmailer/PHPMailerAutoload.php');
require_once(BASE_DIR . "/class/TestMail.php");

function sendmail($user, $type, $content = NULL) {
	global $cfg;
	debug('sending mail', $user);

	$mail = NULL;
	debug('Test if protractor');
	if (TestMail::isProtractor()) {
		debug('It is protractor');
		$mail = new TestMail();
	} else {
		debug('It is NOT protractor');
		$mail = new PHPMailer;
	}

	

	//$mail->SMTPDebug = 3;                               // Enable verbose debug output
	$mail->CharSet = 'UTF-8';
	$mail->isSMTP(); // Set mailer to use SMTP
	$mail->Host = $cfg->smtpServerHost;  // Specify main and backup SMTP servers
	$mail->Port = intval($cfg->smtpServerPort); // TCP port to connect to 
	$mail->SMTPSecure = $cfg->smtpSecure; // Enable TLS encryption, `ssl` also accepted
	$mail->SMTPAuth = true; // Enable SMTP authentication
	$mail->Username = $cfg->smtpServerUsername; // SMTP username
	$mail->Password = $cfg->smtpServerPassword; // SMTP password
	
	$mail->setFrom($cfg->smtpServerFrom, $cfg->appName);
	$mail->addAddress($user->email, ucfirst($user->content->firstname) . ' ' . strtoupper($user->content->lastname));     // Add a recipient
	//$mail->addAddress('ellen@example.com');               // Name is optional
	$mail->addReplyTo('no-reply@no-reply.com', 'Ne pas répondre');
	//$mail->addCC('cc@example.com');
	//$mail->addBCC('bcc@example.com');

	//$mail->addAttachment(BASE_DIR . '/vendor/phpmailer/phpmailer/PHPMailerAutoload.php');         // Add attachments
	//$mail->addAttachment(BASE_DIR . '/../img/file.png');    // Optional name
	$mail->isHTML(true); // Set email format to HTML
	if ($type == 'forgotten-password') {
		$mail->Subject = 'Logistic - Mot de passe oublié';
		$user->createForgottenPasswordCode();
		$mail->Body    = getTemplate(BASE_DIR . '/mail/forgotten-password.html', $user);
		$mail->AltBody = html2txt($mail->Body);
	} else if ($type == 'proposal-send') {
		$mail->Subject = 'Nouvelle proposition';
		$mail->Body    = getTemplate(BASE_DIR . '/mail/proposal-send.html', $user, $content);
		$mail->AltBody = html2txt($mail->Body);
	} else {
		$mail->Subject = 'Here is the subject';
		$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
		$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
	}


	

	if (!$mail->send()) {
		debug('Message could not be sent.');
		debug('Mailer Error: ' . $mail->ErrorInfo);
		return;
	} 
	debug('Message successfully sent.');
}
