<?php
	require_once(BASE_DIR . '/include/misc.inc');

	// Install the web site
	function install() {
		try {
			debug("Starting to install");
			$login = check($_POST['login']);
			$password = check($_POST['password']);
			$host = check($_POST['host']);
			$dbname = check($_POST['dbname']);
			if (!check_mail($_POST["contact_email"])) {
				throw new Exception("Invalid contact mail");
			}
			$contact_email = $_POST["contact_email"];

			$captcha_pub_key = $_POST["captcha_pub_key"];
			$captcha_priv_key = $_POST["captcha_priv_key"];

			$db = new PDO("mysql:host=${host}", $login, $password);

			$requests = <<<EOF
CREATE DATABASE IF NOT EXISTS ${dbname} DEFAULT CHARACTER SET = 'utf8';
USE ${dbname};
EOF;
			debug($requests);

			if ($db->exec($requests) === FALSE) {
				throw new Exception("DB creation: ".sprint_r($db->errorInfo()));
			};

			$db = new PDO("mysql:host=${host};dbname=${dbname}", $login, $password);
			$test_mode = (isset($_POST["test_mode"])) ? "true" : "false";
			$payment_type = $_POST["payment_type"];
			$escape_quote = (isset($_POST["escape_quote"])) ? "true" : "false";
			$merchant_id = $_POST["merchant_id"];
			$https_access = $_POST["https_access"];
			$bitcoin_address = $_POST["bitcoin_address"];
			$facebook_app_id = $_POST["facebook_app_id"];
			$facebook_secret_key = $_POST["facebook_secret_key"];
			$facebook_redirect_uri = $_POST["facebook_redirect_uri"];
			$linkedin_api_key = $_POST["linkedin_api_key"];
			$linkedin_api_secret = $_POST["linkedin_api_secret"];
			$google_analytics = $_POST["google_analytics"];
			$use_recaptcha = (isset($_POST["test_mode"])) ? "false" : "true";
			$content = <<<EOF
<?php
	define("MYSQL_USER", "$login");
	define("MYSQL_PASSWORD", "$password");
	define("MYSQL_HOST", "$host");
	define("MYSQL_DBNAME", "$dbname");

	define("CONTACT_MAIL", "$contact_email");

	define('TEST_MODE', $test_mode);

	define('USE_RECAPTCHA', $use_recaptcha);

	define('MERCHANT_ID', '$merchant_id');
	define('PAYMENT_PROVIDER', "$payment_type");
	require_once('payment/'.PAYMENT_PROVIDER.'/constants.inc');

	define('ESCAPE_QUOTE', $escape_quote);

	define('CAPTCHA_PUB_KEY', '$captcha_pub_key');
	define('CAPTCHA_PRIV_KEY', '$captcha_priv_key');

	define('HTTPS_ACCESS', '$https_access');

	define('BITCOIN_ADDRESS', '$bitcoin_address');

	define('FACEBOOK_APP_ID', '$facebook_app_id');
	define('FACEBOOK_SECRET_KEY', '$facebook_secret_key');
	define('FACEBOOK_REDIRECT_URI', '$facebook_redirect_uri');

	define('LINKEDIN_API_KEY', '$linkedin_api_key');
	define('LINKEDIN_API_SECRET', '$linkedin_api_secret');

	define('USE_GOOGLE_ANALYTICS', $google_analytics);
?>
EOF;
			file_put_contents(SETTINGS_INI, $content);
			chmod(SETTINGS_INI, 0400);
			if (isset($_POST['db_creation'])) {
				$requests = file_get_contents("install.sql");
				$requests = str_replace("ENGINE=InnoDB", "", $requests);

				$st = $db->prepare($requests,
					array(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => TRUE));
				if ($st->execute() === FALSE) {
					echo($requests.'<br/>');
					throw new Exception("Table creation: ".sprint_r($db->errorInfo())." InnoDB?");
				}
			}
			if ($test_mode == "false") {
				$content = <<<EOF
Order Deny,Allow
Deny from all
EOF;
				if (file_put_contents("test/.htaccess", $content) === FALSE) {
					throw new Exception("Cannot create test/.htaccess");
				}
			}
			redirect_to("index.php");
		} catch (Exception $e) {
			throw $e;
		}
	}

	// Uninstal the web site
	function uninstall() {
		try {
			debug("Starting to uninstall");
			$login = MYSQL_USER;
			$password = MYSQL_PASSWORD;
			$host = MYSQL_HOST;
			$dbname = MYSQL_DBNAME;

			$pdo = new PDO("mysql:host=${host};dbname=${dbname};charset=UTF-8", $login, $password);
			$pdo->exec("DROP DATABASE IF EXISTS $dbname");
			chmod(SETTINGS_INI, 0700);
			unlink(SETTINGS_INI);
			if (!TEST_MODE) {
				unlink("test/.htaccess");
			}
			session_destroy();
		} catch (Exception $e) {
			println($e->getMessage());
			throw $e;
		}
		debug("End uninstall");
	}
?>