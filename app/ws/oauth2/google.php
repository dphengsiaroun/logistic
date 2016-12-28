<?php

define("BASE_DIR", dirname(__DIR__));
require_once(BASE_DIR . "/include/account.inc.php");

$url = 'http://localhost:8888/logistic/app/';

$provider = new League\OAuth2\Client\Provider\Google([
    'clientId'     => '92725008221-5ncgqq705b75p48irtva5p4k3hge1ikd.apps.googleusercontent.com',
    'clientSecret' => 'vSVoEoWIXvN4y4R2WbSQGA1J',
    'redirectUri'  => 'http://localhost:8888/logistic/app/ws/oauth2/google.php',
    'hostedDomain' => 'http://localhost:8888',
]);

if (!empty($_GET['error'])) {
    // Got an error, probably user denied access
    exit('Got error: ' . htmlspecialchars($_GET['error'], ENT_QUOTES, 'UTF-8'));

} elseif (empty($_GET['code'])) {
    // If we don't have an authorization code then get one
    $authUrl = $provider->getAuthorizationUrl();
    debug('url', $authUrl);
    $_SESSION['oauth2state'] = $provider->getState();
    debug('oauth2state', $_SESSION['oauth2state']);
    header('Location: ' . $authUrl);
    exit;

} elseif (empty($_GET['state']) || ($_GET['state'] !== $_SESSION['oauth2state'])) {
    debug('state');
    // State is invalid, possible CSRF attack in progress
    unset($_SESSION['oauth2state']);
    exit('Invalid state');

} else {
    debug('else');
    // Try to get an access token (using the authorization code grant)
    $token = $provider->getAccessToken('authorization_code', [
        'code' => $_GET['code']
    ]);

    // Optional: Now you have a token you can look up a users profile data
    try {

        // We got an access token, let's now get the owner details
        $ownerDetails = $provider->getResourceOwner($token);
        debug('ownerDetails', $ownerDetails);
        Account::syncFromGoogle($ownerDetails);

        header('Location: ' . $url);
        exit;

    } catch (Exception $e) {

        // Failed to get user details
        exit('Something went wrong: ' . $e->getMessage());

    }
}
