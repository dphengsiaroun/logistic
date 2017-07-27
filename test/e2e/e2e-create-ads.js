const utils = require('./utils.js');
const data = require('./data/data.js');
const truck = data.trucks[0];
const loaderAd = data.loaderAd;
const carrierAd = data.carrierAd;
const user = data.users[1];
const user1 = data.users[0];

describe('Create ADS', function() {

	beforeEach(function() {
		console.log('Create ADS', arguments);
	});

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			if (browserLog.length > 0) {
				console.log('browserLog', browserLog);
			}
			expect(browserLog.length).toEqual(0);
		});
	});

	it('should create a User 2', function() {
		console.log('-> create a user', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.css('menu-bar')).click();
		element(by.linkText('Se connecter')).click();
		element(by.linkText('Créer un nouveau compte')).click();
		element(by.name('lastname')).clear().sendKeys(user.lastname);
        element(by.name('firstname')).clear().sendKeys(user.firstname);
        element(by.name('login')).clear().sendKeys(user.login);
        element(by.name('email')).clear().sendKeys(user.email);
		utils.lgSelect('profile', user.profile);
        element(by.name('street')).clear().sendKeys(user.street);
        element(by.name('zipcode')).clear().sendKeys(user.zipcode);
        element(by.name('city')).clear().sendKeys(user.city);
        utils.lgChoiceSelect('country', user.country);
		element(by.css('lg-eyepassword input[type="password"]')).clear().sendKeys(user.password);
		browser.sleep(5000);
        element(by.id('pr-create-user-button')).click();
		const message = element(by.css('h2'));
		expect(message.getText()).toEqual('Votre compte est créé.');
		element(by.css('button')).click();
		element(by.css('menu-bar')).click();
		element(by.linkText('Se déconnecter')).click();
		element(by.css('button.yes')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/');
	});

	it('should create Carrier ad', function() {
		console.log('-> create a Carrier ad', arguments);
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
		utils.lgUploadSelect('imageId', carrierAd.imageId);
		element(by.id('pr-add-vehicle-button')).click();
		console.log('-> truck created', arguments);
		element(by.css('button.no')).click();
		element(by.name('lastname')).clear().sendKeys(user1.lastname);
        element(by.name('firstname')).clear().sendKeys(user1.firstname);
        element(by.name('login')).clear().sendKeys(user1.login);
        element(by.name('email')).clear().sendKeys(user1.email);
		utils.lgSelect('profile', user1.profile);
        element(by.name('street')).clear().sendKeys(user1.street);
        element(by.name('zipcode')).clear().sendKeys(user1.zipcode);
        element(by.name('city')).clear().sendKeys(user1.city);
        utils.lgChoiceSelect('country', user1.country);
		element(by.css('lg-eyepassword input[type="password"]')).clear().sendKeys(user1.password);
		browser.sleep(5000);
        element(by.id('pr-create-user-button')).click();
		element(by.css('button')).click();
		element(by.css('button.ok')).click();
		// browser.sleep(5000);
		console.log('-> user created', arguments);
		element(by.id('pr-choose-truck-link')).click();
		element(by.id('pr-select-availabilities')).click();
		element(by.id('pr-availability-total')).click();
		element(by.id('pr-select-price')).click();
		element(by.name('priceWantedPerKm')).sendKeys(data.carrierAd.priceWantedPerKm);
		element(by.id('pr-add-pricing-button')).click();
		element(by.id('pr-create-carrier-button-confirm')).click();
		element(by.css('button')).click();
		console.log('-> Carrier ad created', arguments);
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/ads/carriers');
	});

	it('should create a Loader ad', function() {
		console.log('-> create a Carrier ad', arguments);
		utils.createLoaderAd(loaderAd);
		console.log('-> Loader ad created', arguments);
	});
});
