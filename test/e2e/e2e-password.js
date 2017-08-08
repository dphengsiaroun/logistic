const utils = require('./utils.js');
const data = require('./data/data.js');
const fs = require('fs');
const user = data.users[0];

describe('Test Password', function() {

	beforeEach(function() {
		console.log('Test Password', arguments);
	});

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			if (browserLog.length > 0) {
				console.log('browserLog', browserLog);
			}
			expect(browserLog.length).toEqual(0);
		});
	});

	it('should create a new password', function() {
		console.log('-> create a new password start', arguments);
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
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/forgotten-password-mailsent');
		console.log('data.passwordMailFile', data.passwordMailFile);
		expect(browser.call(function() {
			console.log('about to check if file exists');
			return fs.existsSync(data.passwordMailFile);
		})).toEqual(true);
	});

	it('should create a new password', function() {
		console.log('-> create a new password start', arguments);
		const buffer = fs.readFileSync(data.passwordMailFile, 'utf-8');
		const url = buffer.replace(/^[\s\S]*href="(.*?)"[\s\S]*$/g, '$1');
		console.log('url', url);
		browser.get(url);
		// browser.sleep(5000);
		
		expect(element(by.css('subtitle')).getText()).toEqual('choisissez un nouveau mot de passe');
		element(by.css('lg-eyepassword input[type="password"]')).clear().sendKeys(user.password + '2');
		element(by.css('button')).click();		
	});
});