const init = require('./init.js');
const utils = require('../utils.js');
const data = require('../data/data.js');
const user = data.users[0];

describe('Test CONNECTION', function() {

	beforeEach(function() {
		console.log('Test CONNECTION', arguments);
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

	it('should delete a connection (logout)', function() {
		console.log('-> logout', arguments);
		utils.logout();
	});

	it('should create a connection with an email (login)', function() {
		console.log('-> login with an email', arguments);
		browser.get(data.mainUrl);
		element(by.css('logo')).click();
		element(by.css('menu-bar.fa.fa-bars')).click();
		element(by.linkText('Se connecter')).click();
		element(by.name('login')).clear().sendKeys(user.email);
		element(by.name('password-crypted')).clear().sendKeys(user.password);
		utils.submitForm();
		const userIdentity = element(by.css('.user-identity')).getText();
		expect(userIdentity).toEqual(`${user.firstname} ${user.lastname.toUpperCase()}`);

		// browser.sleep(3000);
	});

	it('should create a connection with pseudo (login)', function() {
		utils.logout();
		console.log('-> login with pseudo', arguments);
		browser.get(data.mainUrl);
		element(by.css('logo')).click();
		element(by.css('menu-bar.fa.fa-bars')).click();
		element(by.linkText('Se connecter')).click();
		element(by.name('login')).clear().sendKeys(user.login);
		element(by.name('password-crypted')).clear().sendKeys(user.password);
		utils.submitForm();		
		const userIdentity = element(by.css('.user-identity')).getText();
		expect(userIdentity).toEqual(`${user.firstname} ${user.lastname.toUpperCase()}`);

		// browser.sleep(3000);
	});

	it('should create a connection with phone (login)', function() {
		utils.logout();
		console.log('-> login with phone', arguments);
		browser.get(data.mainUrl);
		element(by.css('logo')).click();
		element(by.css('menu-bar.fa.fa-bars')).click();
		element(by.linkText('Se connecter')).click();
		element(by.name('login')).clear().sendKeys(user.phone);
		element(by.name('password-crypted')).clear().sendKeys(user.password);
		utils.submitForm();		
		const userIdentity = element(by.css('.user-identity')).getText();
		expect(userIdentity).toEqual(`${user.firstname} ${user.lastname.toUpperCase()}`);

		// browser.sleep(3000);
	});
});
