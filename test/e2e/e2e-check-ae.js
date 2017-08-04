'use strict';

const utils = require('./utils.js');
const data = require('./data/data.js');
const user = data.users[0];

describe('Already exist', function() {

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
		console.log('-> create another user', arguments);
		utils.logout();
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
		element(by.name('phone')).clear().sendKeys(user.phone);
		utils.lgChoiceSelect('country', user.country);
		element(by.css('lg-eyepassword input[type="password"]')).clear().sendKeys(user.password);
		// browser.sleep(5000);
		element(by.id('pr-create-user-button')).click();
		let errorMessage = element(by.css('lg-error span'));
		expect(errorMessage.getText()).toEqual('Ce login est déjà pris.');
		
		element(by.name('login')).clear().sendKeys(user.login + '2');
		element(by.id('pr-create-user-button')).click();
		errorMessage = element(by.css('lg-error span'));
		expect(errorMessage.getText()).toEqual('Email déjà pris.');

		element(by.name('email')).clear().sendKeys(user.email + '2');
		element(by.id('pr-create-user-button')).click();
		errorMessage = element(by.css('lg-error span'));
		expect(errorMessage.getText()).toEqual('Téléphone déjà pris.');
	});
});
