'use strict';

const utils = require('./utils.js');
const data = require('./data/data.js');
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

	it('should create a user for proposal', function() {
		console.log('-> create a user for proposal', arguments);
		utils.user.create(data.users[1]);
	});

	it('should create a proposal', function() {
		console.log('-> create a proposal', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.id('pr-retrieve-loader-ads-button')).click();
		const adElt = element(by.css('loader-list ad-block header[ad-id="4"]'));
		adElt.element(by.css('title')).click();
		browser.sleep(5000);
		element(by.id('create-proposal')).click();
		element(by.id('confirm-create-proposal')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/');
	});

	it('should retrieve proposal', function() {
		console.log('-> retrieve a proposal', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.css('menu-bar')).click();
		element(by.id('my-proposals')).click();
		element(by.css('div.details h2')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/proposal/8');
	});

	it('should update a proposal', function() {
		console.log('-> update a proposal', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.css('menu-bar')).click();
		element(by.id('my-proposals')).click();
		element(by.css('div.details h2')).click();
		element(by.id('pr-update-button')).click();
		browser.sleep(5000);
		element(by.name('titleAd')).clear().sendKeys('Chargement de 50 voitures');
		browser.sleep(5000);		
		element(by.id('pr-update-proposal-button-confirm')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual(`http://localhost:8000/app/${user.login.toLowerCase()}/proposals`);
	});

	it('should delete a proposal', function() {
		console.log('-> delete proposal', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.css('menu-bar')).click();
		element(by.id('my-proposals')).click();
		element(by.css('div.details h2')).click();
		element(by.linkText('Supprimer cette proposition')).click();
		element(by.css('button.confirm')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual(`http://localhost:8000/app/${user.login.toLowerCase()}/proposals`);
	});
});
