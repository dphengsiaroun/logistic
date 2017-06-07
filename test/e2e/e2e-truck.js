const utils = require('./utils.js');
const data = require('./data.js');
var truck = data.trucks[1];

describe('Truck CRUD', function() {

	beforeEach(function() {
		console.log('Truck CRUD', arguments);
	});

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			if (browserLog.length > 0) {
				console.log('browserLog', browserLog);
			}
			expect(browserLog.length).toEqual(0);
		});
	});

	it('should create a truck', function() {
		console.log('-> create a truck', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.css('menu-bar')).click();
		element(by.linkText('Mes véhicules')).click();
		element(by.id('pr-create-truck-button')).click();
		element(by.name('name')).sendKeys(truck.name);
		element(by.name('model')).sendKeys(truck.model);
		utils.lgCitySelect('city', truck.city);
		utils.lgSelect('transportCategory', truck.transportCategory);
		utils.lgChoiceSelect('transportTruckType', truck.transportTruckType);
		utils.lgChoiceSelect('birthyear', truck.birthyear);
		utils.lgUploadSelect('imageId', truck.imageId);
		element(by.id('pr-add-vehicle-button')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/meme/truck');
	});

	// it('should retrieve truck', function() {
	// 	console.log('-> retrieve a truck', arguments);
	// 	browser.get('http://localhost:8000/app/');
	// 	element(by.id('pr-retrieve-carrier-ads-button')).click();
	// 	var adElt = element(by.css('carrier-list ad-block header[ad-id="1"]'));
	// 	var titleElt = adElt.element(by.css('title'));
	// 	expect(titleElt.getText()).toEqual(data.truck.name);
	// });

	// it('should update a truck', function() {
	// 	console.log('-> update a truck', arguments);
	// 	browser.get('http://localhost:8000/app/');
	// 	element(by.css('menu-bar')).click();
	// 	element(by.id('pr-my-ads-link')).click();
	// 	var adElt = element(by.css('carrier-list ad-block header[ad-id="1"]'));
	// 	adElt.element(by.css('title')).click();
	// 	element(by.id('pr-edit-button')).click();
	// 	element(by.id('pr-select-price')).click();
	// 	element(by.name('priceWantedPerKm')).clear().sendKeys('80');
	// 	element(by.id('pr-add-pricing-button')).click();
	// 	element(by.id('pr-update-carrier-button-confirm')).click();
	// 	element(by.css('button.ok')).click();
	// 	expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/ads/carriers');
	// });

	// it('should delete a truck', function() {
	// 	console.log('-> delete truck', arguments);
	// 	element(by.css('menu-bar')).click();
	// 	element(by.linkText('Se connecter')).click();
	// 	element(by.css('button')).click();
	// 	element(by.css('menu-bar')).click();
	// 	element(by.linkText('Mes véhicules')).click();
	// 	element(by.xpath('//div[@class="detail-left"]//span[.="Volvo"]')).click();
	// 	element(by.linkText('Supprimer ce véhicule')).click();
	// 	element(by.css('button.confirm')).click();
	// 	element(by.css('button.ok.ng-binding')).click();
	// });
});
