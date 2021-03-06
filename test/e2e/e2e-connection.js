const utils = require('./utils.js');
const data = require('./data/data.js');
const user = data.users[0];

describe('Selenium Test Case', function() {

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
		element(by.css('lg-eyepassword input[type="password"]')).clear().sendKeys(user.password);
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
		element(by.css('lg-eyepassword input[type="password"]')).clear().sendKeys(user.password);
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
		element(by.css('lg-eyepassword input[type="password"]')).clear().sendKeys(user.password);
		utils.submitForm();		
		const userIdentity = element(by.css('.user-identity')).getText();
		expect(userIdentity).toEqual(`${user.firstname} ${user.lastname.toUpperCase()}`);

		// browser.sleep(3000);
	});
});
