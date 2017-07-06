'use strict';

const utils = require('./utils.js');
const data = require('./data/data.js');
var user = data.users[0];

describe('Init', function() {

	beforeEach(function() {
		console.log('Init', arguments);
	});

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			if (browserLog.length > 0) {
				console.log('browserLog', browserLog);
			}
			expect(browserLog.length).toEqual(0);
		});
	});

	it('should create a user', function() {
		console.log('-> create a user', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.css('menu-bar')).click();
		element(by.linkText('Se connecter')).click();
		element(by.linkText('Créer un nouveau compte')).click();
		element(by.name('lastname')).clear().sendKeys(user.lastname);
        element(by.name('firstname')).clear().sendKeys(user.firstname);
        element(by.name('login')).clear().sendKeys(user.login);
        element(by.name('email')).clear().sendKeys(user.email);
		utils.lgSelect('profile', user.profile);
        element(by.name('street')).clear().sendKeys(user.street);
        element(by.name('zipcode')).clear().sendKeys(user.zipcode);
        element(by.name('city')).clear().sendKeys(user.city);
        utils.lgChoiceSelect('country', user.country);
		element(by.css('lg-eyepassword input[type="password"]')).clear().sendKeys(user.password);
        element(by.id('pr-create-user-button')).click();
		var message = element(by.css('h2'));
		expect(message.getText()).toEqual('Votre compte est créé.');
		element(by.css('button')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/');
	});
});
