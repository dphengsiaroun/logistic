const utils = require('./utils.js');
const data = require('./data/data.js');
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
		utils.logout();
		element(by.css('menu-bar')).click();
		element(by.linkText('Se connecter')).click();
		element(by.linkText('Mot de passe oublié ?')).click();
		browser.sleep(5000);
		element(by.css('[name=email]')).clear().sendKeys(user.email);
		

		element(by.css('button')).click();
	});

});
