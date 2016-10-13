<?php
	define("BASE_DIR", ".");
	require_once(BASE_DIR . '/include/install.inc.php');
	session_start();

	if (isInstalled()) {
		$installAlreadyDone = <<<EOF
<html>
	<head>
		<title>Install Already Done</title>
	</head>
	<body>
		<a href="../index.html">Go to index</a>
	</body>
<html>
EOF;
		println($install_done);
		exit;
	}

	$error_msg = '';
	if (isset($_POST['login'])) {
		try {
			$_SESSION["profile"] = $_POST["profile"];
			install();
			$install_done = <<<EOF
<html>
	<head>
		<title>Install Done</title>
	</head>
	<body>
		<a href="index.php">Go to index</a>
	</body>
<html>
EOF;
			println($install_done);
		} catch (Exception $e) {
			echo '<pre>';
			println("Install failed: " . $e->getMessage());
			print_r($e);
			echo '</pre>';
		}
	} else {
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Installer</title>
		<meta charset="utf-8"/>
		<script type="text/javascript" src="jscript/misc.js"></script>
		<script type="text/javascript" src="_ext/jquery-ui-1.10.3.custom/js/jquery-1.9.1.js"></script>
	</head>
	<body>
		<?php
			echo $error_msg;
		?>
		<form action="" method="POST">
			<select name="profile">
			</select>
		</form>

		Please enter the database connection parameters:
		<form name="input" action="install.php" method="POST">
			<table>
				<tr>
					<td>Username: </td>
					<td><input type="text" name="login"></td>
				</tr>
				<tr>
					<td>Password: </td>
					<td><input type="password" name="password"></td>
				</tr>
				<tr>
					<td>Database Name: </td>
					<td><input type="text" name="dbname"></td>
				</tr>
				<tr>
					<td>Hostname: </td>
					<td><input type="text" name="host"></td>
				</tr>
				<tr>
					<td>Contact mail: </td>
					<td><input type="email" name="contact_email"></td>
				</tr>
				<tr>
					<td>Recaptcha public key: </td>
					<td><input type="text" name="captcha_pub_key"></td>
				</tr>
				<tr>
					<td>Recaptcha private key: </td>
					<td><input type="text" name="captcha_priv_key"></td>
				</tr>
				<tr>
					<td>Merchant id (email): </td>
					<td><input type="text" name="merchant_id"></td>
				</tr>
				<tr>
					<td>Bitcoin address: </td>
					<td><input type="text" name="bitcoin_address"></td>
				</tr>
				<tr>
					<td>Payment type:</td>
					<td>
						<select name="payment_type">
							<option value="paypal">Paypal</option>
							<option value="paypal_sandbox">Paypal Sandbox</option>
							<option value="intern">Intern</option>
						</select>
					</td>
				</tr>
				<tr>
					<td><input type="checkbox" name="test_mode" value="true"/>Test Mode</td>
				</tr>
				<tr>
					<td><input type="checkbox" name="escape_quote" value="true"/>Escape Quote</td>
				</tr>
				<tr>
					<td><input type="checkbox" name="db_creation" value="true"/>Recreate database?</td>
				<tr>
					<td><input type="submit" value="Submit"></td>
				</tr>
				<input type="hidden" name="https_access"/>
				<input type="hidden" name="profile"/>
				<input type="hidden" name="facebook_app_id"/>
				<input type="hidden" name="facebook_secret_key"/>
				<input type="hidden" name="facebook_redirect_uri"/>
				<input type="hidden" name="linkedin_api_key"/>
				<input type="hidden" name="linkedin_api_secret"/>
				<input type="hidden" name="google_analytics"/>
			</table>
		</form>
		<script>
			var profile_array = <?php require_once("profile.json") ?>;
			log(profile_array);
			var combo = "";
			$(document).ready(function() {
				for (i in profile_array) {
					combo += '<option value="' + i + '">' + profile_array[i].name + '</option>';
				}
				$("select[name=profile]").html(combo);
			});
			$("select[name=profile]").change(update_profile);
			$("select[name=profile]").ready(update_profile);

			function update_profile() {
				var i = $(this).val();
				if (!i) {
					i = 0;
				}
				log(i);
				$("input[name=login]").val(profile_array[i].MYSQL_USER);
				$("input[name=password]").val(profile_array[i].MYSQL_PASSWORD);
				$("input[name=host]").val(profile_array[i].MYSQL_HOST);
				$("input[name=dbname]").val(profile_array[i].MYSQL_DBNAME);
				$("input[name=contact_email]").val(profile_array[i].CONTACT_MAIL);
				$("select[name=payment_type]").val(profile_array[i].PAYMENT_PROVIDER);
				$("input[name=captcha_pub_key]").val(profile_array[i].captcha_pub_key);
				$("input[name=captcha_priv_key]").val(profile_array[i].captcha_priv_key);
				$("input[name=merchant_id]").val(profile_array[i].merchant_id);
				$("input[name=https_access]").val(profile_array[i].https_access);
				$("input[name=bitcoin_address]").val(profile_array[i].bitcoin_address);
				$("input[name=facebook_app_id]").val(profile_array[i].facebook_app_id);
				$("input[name=facebook_secret_key]").val(profile_array[i].facebook_secret_key);
				$("input[name=facebook_redirect_uri]").val(profile_array[i].facebook_redirect_uri);
				$("input[name=linkedin_api_key]").val(profile_array[i].linkedin_api_key);
				$("input[name=linkedin_api_secret]").val(profile_array[i].linkedin_api_secret);
				$("input[name=google_analytics]").val(profile_array[i].google_analytics);
				if (profile_array[i].TEST_MODE) {
					log("Test Mode ON");
					$("input[name=test_mode]").prop('checked', true);
				} else {
					log("Test Mode OFF");
					$("input[name=test_mode]").prop('checked', false);
				}
				if (profile_array[i].ESCAPE_QUOTE) {
					$("input[name=escape_quote]").prop('checked', true);
				} else {
					$("input[name=escape_quote]").prop('checked', false);
				}
				$("input[name=profile]").val(i);
			}
		</script>
	</body>
</html>
<?php
	}
?>