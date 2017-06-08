'use strict';

const utils = require('./utils.js');

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
		browser.get('http://localhost:8000/app/install');
		element(by.css('button')).click();
		// browser.sleep(35000);
		var message = element(by.css('h1'));
		expect(message.getText()).toEqual('Installation');
		expect(utils.isDirectoryExisting('../../files/')).toBe(false);
	});

	it('should install', function() {
		console.log('-> install', arguments);
		element(by.xpath("//label[@for='dbCreation']")).click();
		element(by.css('button')).click();
		var message = element(by.css('h3'));
		expect(message.getText()).toEqual('Successfully installed');
	});

	it('should go to website', function() {
		console.log('-> go to website', arguments);
		element(by.linkText('Go to website')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/');
	});
});
