const init = require('./init.js');
const utils = require('../utils.js');
const data = require('../data/data.js');
const fs = require('fs');
const user = data.users[0];

describe('Test PASSWORD', function() {

	beforeEach(function() {
		console.log('Test PASSWORD', arguments);
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

	it('should sent mail for a new password', function() {
		console.log('-> Start sent mail for a new password', arguments);
		if (fs.existsSync(data.passwordMailFile)) {
			console.log('about to unlink', data.passwordMailFile);
			fs.unlinkSync(data.passwordMailFile);
		}

		utils.logout();
		element(by.css('menu-bar')).click();
		element(by.linkText('Se connecter')).click();
		element(by.linkText('Mot de passe oublié ?')).click();
		// browser.sleep(5000);
		element(by.css('[name=email]')).clear().sendKeys(user.email);
		element(by.css('button')).click();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + 'forgotten-password-mailsent');
		console.log('data.passwordMailFile', data.passwordMailFile);
		expect(browser.call(function() {
			console.log('about to check if file exists');
			return fs.existsSync(data.passwordMailFile);
		})).toEqual(true);
	});

	it('should create a new password', function() {
		console.log('-> Start create a new password', arguments);
		const buffer = fs.readFileSync(data.passwordMailFile, 'utf-8');
		const url = buffer.replace(/^[\s\S]*href="(.*?)"[\s\S]*$/g, '$1');
		console.log('url', url);
		browser.get(url);
		// browser.sleep(5000);
		expect(element(by.css('subtitle')).getText()).toEqual('choisissez un nouveau mot de passe');
		element(by.css('lg-eyepassword input[type="password"]')).clear().sendKeys(user.password + '2');
		element(by.css('button')).click();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + 'updated-password');
		element(by.css('button')).click();
	});

	it('test connection with a new password', function() {
		console.log('-> Start connection with a new password', arguments);
		browser.get(data.mainUrl);
		element(by.css('menu-bar')).click();
		element(by.linkText('Se connecter')).click();
		element(by.name('login')).clear().sendKeys(user.email);
		element(by.css('lg-eyepassword input[type="password"]')).clear().sendKeys(user.password + '2');
		utils.submitForm();
		const userIdentity = element(by.css('.user-identity')).getText();
		expect(userIdentity).toEqual(`${user.firstname} ${user.lastname.toUpperCase()}`);
	});

	it('should change the password', function() {
		console.log('-> Start change the password', arguments);
		browser.get(data.mainUrl);
		element(by.css('menu-bar')).click();
		element(by.linkText('Mon profil')).click();
		element(by.linkText('Modifier mot de passe')).click();
		element(by.css('lg-eyepassword input[name="oldPassword"]')).clear().sendKeys(user.password + '2');
		element(by.css('lg-eyepassword input[name="newPassword"]')).clear().sendKeys(user.password);
		element(by.css('button')).click();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + 'updated-password');
	});
});
