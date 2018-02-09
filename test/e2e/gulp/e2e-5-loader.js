const init = require('./init.js');
const utils = require('../utils.js');
const data = require('../data/data.js');
const loaderAd = data.loaderAd[0];
const user = data.users[0];

describe('LOADER CRUD', function() {

	beforeEach(function() {
		console.log('LOADER CRUD', arguments);
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
		console.log('-> should go to website', arguments);
		init.goToWebsite();
	});

	it('should insert geoloc stub', function() {
		console.log('-> should insert geoloc stub', arguments);	
		init.geolocStub();
	});

	it('should create a loader ad', function() {
		console.log('-> create a loader ad', arguments);
		browser.get(data.mainUrl);
		element(by.id('pr-create-loader-ad-button')).click();
		utils.lgSelect('transportCategory', loaderAd.transportCategory);
		utils.lgChoiceSelect('transportTruckType', loaderAd.transportTruckType);
		utils.lgCitySelect('departureCity', loaderAd.departureCity);
		utils.lgCitySelect('arrivalCity', loaderAd.arrivalCity);	
		utils.lgSelect('conditioning', loaderAd.conditioning);
		utils.lgChoiceSelect('typeOfGoods', loaderAd.typeOfGoods);
		utils.lgChoiceSelect('weightIntervals', loaderAd.weightIntervals);
		element(by.name('preciseWeight')).sendKeys(loaderAd.preciseWeight);
		utils.lgUploadSelect('imageId', loaderAd.imageId);
		element(by.name('priceWanted')).sendKeys(loaderAd.priceWanted);
		element(by.name('title')).sendKeys(loaderAd.title);
		utils.submitForm();
		element(by.css('button.no')).click();
		element(by.name('lastname')).clear().sendKeys(user.lastname);
		element(by.name('firstname')).clear().sendKeys(user.firstname);
		element(by.name('login')).clear().sendKeys(user.login);
		element(by.name('email')).clear().sendKeys(user.email);
		utils.lgSelect('profile', user.profile);
		element(by.name('street')).clear().sendKeys(user.street);
		element(by.name('zipcode')).clear().sendKeys(user.zipcode);
		element(by.name('city')).clear().sendKeys(user.city);
		utils.lgChoiceSelect('country', user.country);
		element(by.name('phone')).clear().sendKeys(user.phone);
		element(by.css('lg-eyepassword input[type="password"]')).clear().sendKeys(user.password);
		utils.submitForm();
		element(by.css('button')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + 'ads/loaders');
	});

	it('should retrieve loader ad', function() {
		console.log('-> retrieve a loader ad', arguments);
		browser.get(data.mainUrl);
		element(by.id('pr-retrieve-loader-ads-button')).click();
		const adElt = element(by.css('loader-list ad-block'));
		const titleElt = adElt.element(by.css('h1'));
		expect(titleElt.getText()).toEqual(loaderAd.title);
	});

	it('should update loader ad', function() {
		console.log('-> update a loader ad', arguments);
		browser.get(data.mainUrl);
		element(by.css('menu-bar')).click();
		element(by.id('pr-my-ads-link')).click();
		const adElt = element(by.css('loader-list ad-block'));
		adElt.element(by.css('h1')).click();
		element(by.id('pr-edit-button')).click();
		element(by.name('priceWanted')).clear().sendKeys('5000');
		// browser.sleep(5000);
		utils.submitForm();
		// browser.sleep(5000);
		element(by.css('button.ok')).click();
		// browser.sleep(5000);
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + 'ads/loaders');
	});

	it('should delete a loader ad', function() {
		console.log('-> delete a loader ad', arguments);
		browser.get(data.mainUrl);
		element(by.css('menu-bar')).click();
		element(by.id('pr-my-ads-link')).click();
		const adElt = element(by.css('loader-list ad-block'));
		adElt.element(by.css('h1')).click();
		element(by.linkText('Supprimer')).click();
		element(by.css('button.confirm')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + 'ads/loaders');
	});
});
