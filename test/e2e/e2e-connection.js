const utils = require('./utils.js');
const data = require('./data/data.js');
const user = data.users[0];

describe('Selenium Test Case', function() {

	it('should delete a connection (logout)', function() {
		console.log('-> logout', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.css('logo')).click();
		element(by.css('menu-bar.fa.fa-bars')).click();
		element(by.linkText('Se déconnecter')).click();
		element(by.css('button.yes')).click();

		const userIdentity = element(by.css('.user-identity')).getText();
		expect(userIdentity).toEqual('');
	});

	it('should create a connection (login)', function() {
		console.log('-> login', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.css('logo')).click();
		element(by.css('menu-bar.fa.fa-bars')).click();
		element(by.linkText('Se connecter')).click();
		element(by.name('login')).clear().sendKeys(user.email);
		element(by.name('password-crypted')).clear().sendKeys(user.password);
		element(by.id('pr-button-connect-user')).click();

		const userIdentity = element(by.css('.user-identity')).getText();
		expect(userIdentity).toEqual(`${user.firstname} ${user.lastname.toUpperCase()}`);

		// browser.sleep(3000);
	});
});
