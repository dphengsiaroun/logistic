const init = require('./init.js');
const utils = require('../utils.js');
const data = require('../data/data.js');
const user = data.users[0];

describe('USER CRUD', function() {

	beforeEach(function() {
		console.log('USER CRUD', arguments);
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
		console.log('-> should make geoloc stub', arguments);
		init.goToWebsite();
	});

	it('should create a user', function() {
		console.log('-> create a user', arguments);
		utils.user.create(user);
	});

	it('should retrieve a user', function() {
		console.log('-> retrieve a user', arguments);
		browser.driver.navigate().refresh();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + '');
		element(by.css('menu-bar')).click();
		const link = element(by.linkText('Mon profil'));
		expect(link).toBeDefined();
	});

	it('should update a user', function() {
		console.log('-> update a user', arguments);
		element(by.linkText('Mon profil')).click();
		element(by.css('[name=lastname]')).clear().sendKeys('Phengsiaroun');
		element(by.css('button')).click();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + 'updated-profile');
		element(by.css('button')).click();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + '');
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
