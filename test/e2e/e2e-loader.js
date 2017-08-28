const utils = require('./utils.js');
const data = require('./data/data.js');
const loaderAd = data.loaderAd[0];
const user = data.users[0];

describe('Loader CRUD', function() {

	beforeEach(function() {
		console.log('Loader ad CRUD', arguments);
	});

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			if (browserLog.length > 0) {
				console.log('browserLog', browserLog);
			}
			expect(browserLog.length).toEqual(0);
		});
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
		element(by.id('pr-button-create-loader-ad')).click();
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
		element(by.id('pr-create-user-button')).click();
		element(by.css('button')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + 'ads/loaders');
	});

	it('should retrieve loader ad', function() {
		console.log('-> retrieve a loader ad', arguments);
		browser.get(data.mainUrl);
		element(by.id('pr-retrieve-loader-ads-button')).click();
		const adElt = element(by.css('loader-list ad-block'));
		const titleElt = adElt.element(by.css('title'));
		expect(titleElt.getText()).toEqual(loaderAd.title);
	});

	it('should update loader ad', function() {
		console.log('-> update a loader ad', arguments);
		browser.get(data.mainUrl);
		element(by.css('menu-bar')).click();
		element(by.id('pr-my-ads-link')).click();
		const adElt = element(by.css('loader-list ad-block'));
		adElt.element(by.css('title')).click();
		element(by.id('pr-edit-button')).click();
		element(by.name('priceWanted')).clear().sendKeys('5000');
		element(by.id('pr-update-loader-button-confirm')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + 'ads/loaders');
	});

	it('should delete a loader ad', function() {
		console.log('-> delete a loader ad', arguments);
		browser.get(data.mainUrl);
		element(by.css('menu-bar')).click();
		element(by.id('pr-my-ads-link')).click();
		const adElt = element(by.css('loader-list ad-block'));
		adElt.element(by.css('title')).click();
		element(by.linkText('Supprimer cette annonce')).click();
		element(by.css('button.confirm')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual(data.mainUrl + 'ads/loaders');
	});
});
