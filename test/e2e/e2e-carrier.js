const utils = require('./utils.js');
const data = require('./data.js');
var truck = data.trucks[0];

describe('Carrier CRUD', function() {

	beforeEach(function() {
		console.log('Carrier ad CRUD', arguments);
	});

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			expect(browserLog.length).toEqual(0);
		});
	});

	it('should create carrier ad', function() {
		console.log('-> create a carrier ad', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.id('pr-create-carrier-ad-button')).click();
		element(by.id('pr-select-truck-link')).click();
		element(by.id('pr-continue-button')).click();
		element(by.name('name')).sendKeys(truck.name);
		element(by.name('model')).sendKeys(truck.model);
		utils.lgCitySelect('city', truck.city);
		utils.lgSelect('transportCategory', truck.transportCategory);
		utils.lgChoiceSelect('transportTruckType', truck.transportTruckType);
		utils.lgChoiceSelect('birthyear', truck.birthyear);
		element(by.id('pr-add-vehicle-button')).click();
		console.log('-> truck created', arguments);
		element(by.css('button.no')).click();
		element(by.css('button')).click();
		console.log('-> user created', arguments);
		element(by.css('button')).click();
		element(by.css('button.ok')).click();
		element(by.id('pr-choose-truck-link')).click();
		element(by.id('pr-select-availabilities')).click();
		element(by.id('pr-availability-total')).click();
		element(by.id('pr-select-price')).click();
		element(by.name('priceWantedPerKm')).sendKeys(data.carrierAd.priceWantedPerKm);
		element(by.id('pr-add-pricing-button')).click();
		element(by.id('pr-create-carrier-button-confirm')).click();
		element(by.css('button.ok')).click();
		console.log('-> Carrier ad created', arguments);
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/ads/carriers');
	});

	it('should retrieve carrier ad', function() {
		console.log('-> retrieve a carrier ad', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.id('pr-retrieve-carrier-ads-button')).click();
		var adElt = element(by.css('carrier-list ad-block header[ad-id="1"]'));
		var titleElt = adElt.element(by.css('title'));
		expect(titleElt.getText()).toEqual(truck.name);
	});

	it('should update carrier ad', function() {
		console.log('-> update a carrier ad', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.css('menu-bar')).click();
		element(by.id('pr-my-ads-link')).click();
		var adElt = element(by.css('carrier-list ad-block header[ad-id="1"]'));
		adElt.element(by.css('title')).click();
		element(by.id('pr-edit-button')).click();
		element(by.id('pr-select-price')).click();
		element(by.name('priceWantedPerKm')).clear().sendKeys('80');
		element(by.id('pr-add-pricing-button')).click();
		element(by.id('pr-update-carrier-button-confirm')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/ads/carriers');
	});

	it('should delete a user', function() {
		console.log('-> delete a carrier ad', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.css('menu-bar')).click();
		element(by.id('pr-my-ads-link')).click();
		var adElt = element(by.css('carrier-list ad-block header[ad-id="1"]'));
		adElt.element(by.css('title')).click();
		element(by.linkText('Supprimer cette annonce')).click();
		element(by.css('button.confirm')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/ads/carriers');
	});
});
