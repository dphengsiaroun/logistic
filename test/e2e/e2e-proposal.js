'use strict';

const utils = require('./utils.js');
const data = require('./data/data.js');
const fs = require('fs');
const user = data.users[1];

describe('Proposal CRUD', function() {

	beforeEach(function() {
		console.log('Proposal CRUD', arguments);
	});

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			if (browserLog.length > 0) {
				console.log('browserLog', browserLog);
			}
			expect(browserLog.length).toEqual(0);
		});
	});

	it('should log user', function() {
		console.log('-> log a user', arguments);
		utils.login(user);
	});

	it('should create a proposal', function() {
		console.log('-> create a proposal', arguments);
		if (fs.existsSync(data.passwordMailFile)) {
			console.log('about to unlink', data.passwordMailFile);
			fs.unlinkSync(data.passwordMailFile);
		}
		browser.get(data.mainUrl);
		element(by.id('pr-retrieve-loader-ads-button')).click();
		const adElt = element.all(by.css('loader-list ad-block')).get(0);
		adElt.element(by.css('h1')).click();
		// browser.sleep(5000);
		element(by.id('create-proposal')).click();
		utils.submitForm();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + '');
		expect(browser.call(function() {
			console.log('about to check if file exists');
			return fs.existsSync(data.passwordMailFile);
		})).toEqual(true);
	});

	it('should retrieve proposal', function() {
		console.log('-> retrieve a proposal', arguments);
		browser.get(data.mainUrl);
		element(by.css('menu-bar')).click();
		element(by.id('my-proposals')).click();
		element(by.css('div.details h2')).click();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + 'proposal/24');
	});

	it('should update a proposal', function() {
		console.log('-> update a proposal', arguments);
		browser.get(data.mainUrl);
		element(by.css('menu-bar')).click();
		element(by.id('my-proposals')).click();
		element(by.css('div.details h2')).click();
		element(by.id('pr-update-button')).click();
		element(by.name('titleAd')).clear().sendKeys('Chargement de 50 voitures');
		utils.submitForm();		
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual(`${data.mainUrl}${user.login.toLowerCase()}/proposals`);
	});

	it('should delete a proposal', function() {
		console.log('-> delete proposal', arguments);
		browser.get(data.mainUrl);
		element(by.css('menu-bar')).click();
		element(by.id('my-proposals')).click();
		element(by.css('div.details h2')).click();
		element(by.linkText('Supprimer')).click();
		element(by.css('button.confirm')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual(`${data.mainUrl}${user.login.toLowerCase()}/proposals`);
	});
});
