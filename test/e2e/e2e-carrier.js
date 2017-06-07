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

	it('should create carrier', function() {
		browser.get('http://localhost:8000/app/');
		element(by.id('pr-to-deposit-carrier')).click();
		element(by.id('pr-select-truck')).click();
		element(by.id('pr-to-continue')).click();
		element(by.id('pr-vehicle-name')).sendKeys('132443-123-15');
		element(by.id('pr-vehicle-description')).sendKeys('Volvo');
		utils.selectCity('city', 'Abi Youcef');
		element(by.xpath('//formx[@class="ad"]//span[.="Camion"]')).click();
		element(by.xpath('//formx[@class="ad"]//my-input[.="Ex : Benne, Bâché, etc."]')).click();
		element(by.xpath('//formx[@class="ad"]//span[.="Semi-remorque"]')).click();
		element(by.xpath('//formx[@class="ad"]//my-input[.="Ex : 2005"]')).click();
		element(by.xpath('//formx[@class="ad"]//item[normalize-space(.)="2014"]')).click();
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
