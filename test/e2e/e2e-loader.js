const utils = require('./utils.js');
const data = require('./data.js');
var loaderAd = data.loaderAd;

describe('Loader CRUD', function() {

	beforeEach(function() {
		console.log('Loader ad CRUD', arguments);
	});

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			expect(browserLog.length).toEqual(0);
		});
	});

	it('should create a loader ad', function() {
		console.log('-> create a loader ad', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.id('pr-create-loader-ad-button')).click();
		utils.lgSelect('transportCategory', loaderAd.transportCategory);
		utils.lgChoiceSelect('transportTruckType', loaderAd.transportTruckType);
		utils.lgCitySelect('departureCity', loaderAd.departureCity);
		utils.lgCitySelect('arrivalCity', loaderAd.arrivalCity);
		utils.lgSelect('conditioning', loaderAd.conditioning);
		// utils.lgChoiceSelect('typeOfGoods', loaderAd.typeOfGoods);
		// utils.lgChoiceSelect('weightIntervals', loaderAd.weightIntervals);
		// element(by.name('preciseWeight')).sendKeys(loaderAd.preciseWeight);
		// utils.lgUploadSelect('imageId', loaderAd.imageId);
		// element(by.name('priceWanted')).sendKeys(loaderAd.priceWanted);
		// element(by.name('title')).sendKeys(loaderAd.title);
		// element(by.id('pr-button-create-loader-ad')).click();
		// element(by.css('button.no')).click();
		// element(by.id('pr-create-user-button')).click();
		// console.log('-> user created', arguments);
		// element(by.css('button')).click();
		// element(by.css('button.ok')).click();
		// console.log('-> Loader ad created', arguments);
		// expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/ads/loaders');
	});

	// it('should retrieve loader ad', function() {
	// 	console.log('-> retrieve a loader ad', arguments);
	// 	browser.get('http://localhost:8000/app/');
	// 	element(by.id('pr-retrieve-loader-ads-button')).click();
	// 	var adElt = element(by.css('loader-list ad-block header[ad-id="1"]'));
	// 	var titleElt = adElt.element(by.css('title'));
	// 	expect(titleElt.getText()).toEqual(loaderAd.title);
	// });

	// it('should update loader ad', function() {
	// 	console.log('-> update a loader ad', arguments);
	// 	browser.get('http://localhost:8000/app/');
	// 	element(by.css('menu-bar')).click();
	// 	element(by.id('pr-my-ads-link')).click();
	// 	var adElt = element(by.css('loader-list ad-block header[ad-id="1"]'));
	// 	adElt.element(by.css('title')).click();
	// 	element(by.id('pr-edit-button')).click();
	// 	element(by.name('priceWanted')).clear().sendKeys('5000');
	// 	element(by.id('pr-update-loader-button-confirm')).click();
	// 	element(by.css('button.ok')).click();
	// 	expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/ads/loaders');
	// });

	// it('should delete a loader ad', function() {
	// 	console.log('-> delete a loader ad', arguments);
	// 	browser.get('http://localhost:8000/app/');
	// 	element(by.css('menu-bar')).click();
	// 	element(by.id('pr-my-ads-link')).click();
	// 	var adElt = element(by.css('loader-list ad-block header[ad-id="1"]'));
	// 	adElt.element(by.css('title')).click();
	// 	element(by.linkText('Supprimer cette annonce')).click();
	// 	element(by.css('button.confirm')).click();
	// 	element(by.css('button.ok')).click();
	// 	expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/ads/loaders');
	// });
});