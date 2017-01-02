<?php

define("BASE_DIR", dirname(__DIR__));
require_once(BASE_DIR . "/include/account.inc.php");

$url = getAppUrl();

$provider = new \League\OAuth2\Client\Provider\Facebook([
    'clientId'          => $cfg->oauth2FacebookClientId,
    'clientSecret'      => $cfg->oauth2FacebookClientSecret,
    'redirectUri'       => $url . 'ws/oauth2/facebook.php',
    'graphApiVersion'   => 'v2.8',
]);

$guzzleClient = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), ));
$provider->setHttpClient($guzzleClient);

if (!isset($_GET['code'])) {

    // If we don't have an authorization code then get one
    $authUrl = $provider->getAuthorizationUrl([
        'scope' => ['email'],
    ]);
    $_SESSION['oauth2state'] = $provider->getState();

    debug('oauth2state', $_SESSION['oauth2state']);
    header('Location: ' . $authUrl);
    exit;

// Check given state against previously stored one to mitigate CSRF attack
} elseif (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {

    unset($_SESSION['oauth2state']);
    echo 'Invalid state.';
    exit;

}

// Try to get an access token (using the authorization code grant)
$token = $provider->getAccessToken('authorization_code', [
    'code' => $_GET['code']
]);

// Optional: Now you have a token you can look up a users profile data
try {

    // We got an access token, let's now get the owner details
    $ownerDetails = $provider->getResourceOwner($token);
    debug('ownerDetails', $ownerDetails);
    Account::syncFromFacebook($ownerDetails);

    header('Location: ' . $url);
    exit;

} catch (Exception $e) {

    // Failed to get user details
    exit('Something went wrong: ' . $e->getMessage());

}
