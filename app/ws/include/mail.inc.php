<?php

require BASE_DIR . '/vendor/phpmailer/phpmailer/PHPMailerAutoload.php';

function sendMail($request) {
	global $smtpServerHost, $smtpServerPort, $smtpServerUsername, $smtpServerPassword, $smtpServerFrom;
	debug('sending mail', $request);

	$mail = new PHPMailer;

	//$mail->SMTPDebug = 3;                               // Enable verbose debug output

	$mail->isSMTP(); // Set mailer to use SMTP
	debug('ok1');
	$mail->Host = $smtpServerHost;  // Specify main and backup SMTP servers
	debug('ok2');
	$mail->Port = intval($smtpServerPort); // TCP port to connect to 
	debug('ok3'); 
	$mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted
	debug('ok4');
	$mail->SMTPAuth = true; // Enable SMTP authentication
	debug('ok5');
	$mail->Username = $smtpServerUsername; // SMTP username
	debug('ok6');
	$mail->Password = $smtpServerPassword; // SMTP password
	debug('ok7');
	
	                                 

	$mail->setFrom($smtpServerFrom, 'Mailer');
	debug('ok8');
	debug('mail', $mail);

	$mail->addAddress('jlguenego.logistic@gmail.com', 'Joe User');     // Add a recipient
	//$mail->addAddress('ellen@example.com');               // Name is optional
	$mail->addReplyTo('jlguenego.logistic@gmail.com', 'Information Logistic');
	//$mail->addCC('cc@example.com');
	//$mail->addBCC('bcc@example.com');

	$mail->addAttachment(BASE_DIR . '/vendor/phpmailer/phpmailer/PHPMailerAutoload.php');         // Add attachments
	$mail->addAttachment(BASE_DIR . '/../img/file.png');    // Optional name
	$mail->isHTML(true);                                  // Set email format to HTML

	$mail->Subject = 'Here is the subject';
	$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
	$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

	if (!$mail->send()) {
		debug('Message could not be sent.');
		debug('Mailer Error: ' . $mail->ErrorInfo);
	}
}
