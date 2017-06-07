const utils = require('./utils.js');

describe('Carrier CRUD', function() {

	beforeEach(function() {
		console.log('Create Loader', arguments);
	});

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			expect(browserLog.length).toEqual(0);
		});
	});

	it('should create carrier ad', function() {
		browser.get('http://localhost:8000/app/');
		element(by.id('pr-create-carrier-ad-button')).click();
		element(by.id('pr-select-truck')).click();
		element(by.id('pr-to-continue')).click();
		element(by.id('pr-vehicle-name')).sendKeys('132443-123-15');
		element(by.id('pr-vehicle-description')).sendKeys('Volvo');
		utils.lgCitySelect('city', 'Abi Youcef');
		utils.lgSelect('transportCategory', 'Camion');
		utils.lgChoiceSelect('transportTruckType', 'Semi-remorque');
		utils.lgChoiceSelect('birthyear', '2014');
		element(by.id('pr-add-vehicle')).click();
		console.log('-> truck created', arguments);
		element(by.css('button.no')).click();
		element(by.css('button')).click();
		console.log('-> user created', arguments);
		element(by.css('button')).click();
		console.log('-> to continue', arguments);
		element(by.css('button.ok')).click();
		element(by.id('pr-choose-truck')).click();
		element(by.id('pr-select-availabilities')).click();
		element(by.id('pr-availability-total')).click();
		element(by.id('pr-select-price')).click();
		element(by.id('pr-price-wanted-per-km')).sendKeys('50');
		element(by.id('pr-add-pricing')).click();
		element(by.id('pr-create-carrier')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/ads/carriers');
	});

	it('should retrieve carrier ad', function() {
		browser.get('http://localhost:8000/app/');
		element(by.id('pr-retrieve-carrier-ads-button')).click();
		var adElt = element(by.css('carrier-list ad-block header[ad-id="1"]'));
		var titleElt = adElt.element(by.css('title'));
		expect(titleElt.getText()).toEqual('132443-123-15');
	});


	// it('should retrieve a user', function() {
	// 	browser.driver.navigate().refresh();
	// 	expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/');
	// 	element(by.css('menu-bar')).click();
	// 	var link = element(by.linkText('Mon profil'));
	// 	expect(link).toBeDefined();
	// });

	// it('should update a user', function() {
	// 	element(by.linkText('Mon profil')).click();
	// 	element(by.css('[name=lastname]')).clear().sendKeys('Phengsiaroun');
	// 	element(by.css('button')).click();
	// 	expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/updated-profile');
	// 	element(by.css('button')).click();
	// 	expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/');
	// });

	// it('should delete a user', function() {
	// 	element(by.css('menu-bar')).click();
	// 	element(by.linkText('Mon profil')).click();
	// 	element(by.linkText('Supprimer mon compte')).click();
	// 	element.all(by.css('button.confirm')).click();
	// 	element.all(by.css('button.ok')).click();
	// });
});
