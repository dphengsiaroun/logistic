'use strict';

const utils = require('../utils.js');
const data = require('../data/data.js');

describe('Install', function() {

	beforeEach(function() {
		console.log('Install', arguments);
	});

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			if (browserLog.length > 0) {
				console.log('browserLog', browserLog);
			}
			expect(browserLog.length).toEqual(0);
		});
	});

	it('should uninstall', function() {
		console.log('-> uninstall', arguments);
		browser.get(data.mainUrl + 'install');
		element(by.css('button')).click();
		// browser.sleep(35000);
		const message = element(by.css('h1'));
		expect(message.getText()).toEqual('Installation');
		expect(utils.isDirectoryExisting('../../files/')).toBe(false);
	});

	it('should install', function() {
		console.log('-> install', arguments);
		element(by.xpath('//label[@for=\'dbCreation\']')).click();
		element(by.id('smtp.server.from')).clear().sendKeys('protractor@test.com');
		element(by.css('button')).click();
		const message = element(by.css('h3'));
		expect(message.getText()).toEqual('Successfully installed');
	});

	it('should go to website', function() {
		console.log('-> go to website', arguments);
		element(by.linkText('Go to website')).click();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl);
	});
});
