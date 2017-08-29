const utils = require('./utils.js');
const data = require('./data/data.js');
const truck = data.trucks[0];
const carrierAd = data.carrierAd[0];
const user = data.users[0];

describe('Carrier CRUD', function() {

	beforeEach(function() {
		console.log('Carrier ad CRUD', arguments);
	});

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			if (browserLog.length > 0) {
				console.log('browserLog', browserLog);
			}
			expect(browserLog.length).toEqual(0);
		});
	});

	it('should create carrier ad', function() {
		console.log('-> create a carrier ad', arguments);
		browser.get(data.mainUrl);
		element(by.id('pr-create-carrier-ad-button')).click();
		element(by.id('pr-select-truck-link')).click();
		element(by.id('pr-continue-button')).click();
		element(by.name('name')).sendKeys(truck.name);
		element(by.name('model')).sendKeys(truck.model);
		utils.lgCitySelect('city', truck.city);
		utils.lgSelect('transportCategory', truck.transportCategory);
		utils.lgChoiceSelect('transportTruckType', truck.transportTruckType);
		utils.lgChoiceSelect('birthyear', truck.birthyear);
		utils.lgUploadSelect('imageId', truck.imageId);
		utils.submitForm();
		console.log('-> truck created', arguments);
		element(by.css('button.no')).click();
		element(by.name('lastname')).clear().sendKeys(user.lastname);
        element(by.name('firstname')).clear().sendKeys(user.firstname);
        element(by.name('login')).clear().sendKeys(user.login);
        element(by.name('email')).clear().sendKeys(user.email);
		utils.lgSelect('profile', user.profile);
        element(by.name('street')).clear().sendKeys(user.street);
        element(by.name('zipcode')).clear().sendKeys(user.zipcode);
		element(by.name('city')).clear().sendKeys(user.city);
		element(by.name('phone')).clear().sendKeys(user.phone);
        utils.lgChoiceSelect('country', user.country);
		element(by.css('lg-eyepassword input[type="password"]')).clear().sendKeys(user.password);
		browser.sleep(5000);
        utils.submitForm();
		element(by.css('button')).click();
		console.log('-> user created', arguments);
		element(by.css('button.ok')).click();
		element(by.id('truck-' + truck.name)).click();
		element(by.id('pr-select-availabilities')).click();
		element(by.id('pr-availability-total')).click();
		element(by.id('pr-select-price')).click();
		element(by.name('priceWantedPerKm')).sendKeys(carrierAd.priceWantedPerKm);
		utils.submitForm();
		element(by.id('pr-create-carrier-button-confirm')).click();
		element(by.css('button.ok')).click();
		console.log('-> Carrier ad created', arguments);
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + 'ads/carriers');
	});

	it('should retrieve carrier ad', function() {
		console.log('-> retrieve a carrier ad', arguments);
		browser.get(data.mainUrl);
		element(by.id('pr-retrieve-carrier-ads-button')).click();
		const adElt = element(by.css('carrier-list ad-block'));
		const titleElt = adElt.element(by.css('title'));
		expect(titleElt.getText()).toEqual(truck.name);
	});

	it('should update carrier ad', function() {
		console.log('-> update a carrier ad', arguments);
		browser.get(data.mainUrl);
		element(by.css('menu-bar')).click();
		element(by.id('pr-my-ads-link')).click();
		const adElt = element(by.css('carrier-list ad-block'));
		adElt.element(by.css('title')).click();
		element(by.id('pr-edit-button')).click();
		element(by.id('pr-select-price')).click();
		element(by.name('priceWantedPerKm')).clear().sendKeys('80');
		utils.submitForm();
		element(by.id('pr-update-carrier-button-confirm')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + 'ads/carriers');
	});

	it('should delete a carrier ad', function() {
		console.log('-> delete a carrier ad', arguments);
		browser.get(data.mainUrl);
		element(by.css('menu-bar')).click();
		element(by.id('pr-my-ads-link')).click();
		const adElt = element(by.css('carrier-list ad-block'));
		adElt.element(by.css('title')).click();
		element(by.linkText('Supprimer cette annonce')).click();
		element(by.css('button.confirm')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + 'ads/carriers');
	});
});
