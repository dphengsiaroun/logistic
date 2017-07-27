const utils = require('./utils.js');
const data = require('./data/data.js');
const user = data.users[0];

describe('User CRUD', function() {

	beforeEach(function() {
		console.log('User CRUD', arguments);
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
		// We fill the form
		element(by.css('[name=lastname]')).clear().sendKeys(user.lastname);
		element(by.css('[name=firstname]')).clear().sendKeys(user.firstname);
		element(by.css('[name=login]')).clear().sendKeys(user.login);
		element(by.css('[name=email]')).clear().sendKeys(user.email);
		element(by.css(`lg-option[value="${user.profile}"]`)).click();
		element(by.css('[name=street]')).clear().sendKeys(user.street);
		element(by.css('[name=zipcode]')).clear().sendKeys(user.zipcode);
		element(by.css('[name=city]')).clear().sendKeys(user.city);
		utils.lgChoiceSelect('country', user.country);
		element(by.css('[name=phone]')).clear().sendKeys(user.phone);
		element(by.css('[name=password-crypted]')).clear().sendKeys(user.password);

		// browser.sleep(20000);

		element(by.css('button')).click();
		// // browser.sleep(35000);
		const message = element(by.css('h2'));
		expect(message.getText()).toEqual('Votre compte est créé.');
		element(by.css('button')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/');
	});

	it('should retrieve a user', function() {
		console.log('-> retrieve a user', arguments);
		browser.driver.navigate().refresh();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/');
		element(by.css('menu-bar')).click();
		const link = element(by.linkText('Mon profil'));
		expect(link).toBeDefined();
	});

	it('should update a user', function() {
		console.log('-> update a user', arguments);
		element(by.linkText('Mon profil')).click();
		element(by.css('[name=lastname]')).clear().sendKeys('Phengsiaroun');
		element(by.css('button')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/updated-profile');
		element(by.css('button')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/');
	});

	it('should delete a user', function() {
		console.log('-> delete a user', arguments);
		element(by.css('menu-bar')).click();
		element(by.linkText('Mon profil')).click();
		element(by.linkText('Supprimer mon compte')).click();
		element.all(by.css('button.confirm')).click();
		element.all(by.css('button.ok')).click();
	});
});
