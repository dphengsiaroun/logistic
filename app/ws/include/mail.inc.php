<?php

require BASE_DIR . '/vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

function sendmail($account, $type) {
	global $cfg;
	debug('sending mail', $account);

	$mail = new PHPMailer;

	//$mail->SMTPDebug = 3;                               // Enable verbose debug output
	$mail->CharSet = 'UTF-8';
	$mail->isSMTP(); // Set mailer to use SMTP
	$mail->Host = $cfg->smtpServerHost;  // Specify main and backup SMTP servers
	$mail->Port = intval($cfg->smtpServerPort); // TCP port to connect to 
	$mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
	$mail->SMTPAuth = true; // Enable SMTP authentication
	$mail->Username = $cfg->smtpServerUsername; // SMTP username
	$mail->Password = $cfg->smtpServerPassword; // SMTP password
	
	$mail->setFrom($cfg->smtpServerFrom, $cfg->appName);
	$mail->addAddress($account->email, ucfirst($account->content->firstname) . ' ' . strtoupper($account->content->lastname));     // Add a recipient
	//$mail->addAddress('ellen@example.com');               // Name is optional
	$mail->addReplyTo('no-reply@no-reply.com', 'Ne pas répondre');
	//$mail->addCC('cc@example.com');
	//$mail->addBCC('bcc@example.com');

	//$mail->addAttachment(BASE_DIR . '/vendor/phpmailer/phpmailer/PHPMailerAutoload.php');         // Add attachments
	//$mail->addAttachment(BASE_DIR . '/../img/file.png');    // Optional name
	$mail->isHTML(true); // Set email format to HTML
	if ($type == 'forgotten-password') {
		$mail->Subject = 'Logistic - Mot de passe oublié';
		$account->createForgottenPasswordCode();
		$mail->Body    = getTemplate(BASE_DIR . '/mail/forgotten-password.html', $account);
		$mail->AltBody = html2txt($mail->Body);
	} else {
		$mail->Subject = 'Here is the subject';
		$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
		$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
	}


	

	if (!$mail->send()) {
		debug('Message could not be sent.');
		debug('Mailer Error: ' . $mail->ErrorInfo);
	}
}
