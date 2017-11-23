'use strict';

const init = require('./init.js');
const utils = require('../utils.js');
const data = require('../data/data.js');
const user = data.users[0];

describe('Test ALREADY EXIST', function() {

	beforeEach(function() {
		console.log('Test ALREADY EXIST', arguments);
	});

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			if (browserLog.length > 0) {
				console.log('browserLog', browserLog);
			}
			expect(browserLog.length).toEqual(0);
		});
	});

	it('should make uninstall', function() {
		console.log('-> should make uninstall', arguments);
		init.uninstall();
	});

	it('should make install', function() {
		console.log('-> should make install', arguments);
		init.install();
	});

	it('should go to website', function() {
		console.log('-> should go to website', arguments);
		init.goToWebsite();
	});

	it('should create a user', function() {
		console.log('-> create a user', arguments);
		utils.user.create(user);
	});

	it('should create another user', function() {
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
		browser.sleep(3000);
		const btn = element(by.id('pr-create-user-button'));
		expect(btn.getAttribute('disabled')).toEqual('true');

		expect(element(by.id('login-already-taken-error-msg')).isDisplayed()).toEqual(true);
		expect(element(by.id('email-already-taken-error-msg')).isDisplayed()).toEqual(true);
		expect(element(by.id('phone-already-taken-error-msg')).isDisplayed()).toEqual(true);

		element(by.name('login')).clear().sendKeys(user.login + '2');
		browser.sleep(1000);
		expect(btn.getAttribute('disabled')).toEqual('true');

		element(by.name('email')).clear().sendKeys(user.email + '2');
		browser.sleep(1000);
		expect(btn.getAttribute('disabled')).toEqual('true');

		element(by.name('phone')).clear().sendKeys(user.phone + '2000');
		browser.sleep(1000);
		expect(btn.getAttribute('disabled')).toEqual(null);

	});
});
