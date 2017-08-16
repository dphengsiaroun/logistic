const utils = require('./utils.js');
const data = require('./data/data.js');
const user = data.users[0];
const truck = data.trucks[0];


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

	it('should create a user', function() {
		console.log('-> start', arguments);
		utils.user.create(data.users[0]);
	});

	it('should create a truck', function() {
		console.log('-> start', arguments);
		utils.user.truck.create(data.trucks[0]);
	});

	it('should create a Carrier ad', function() {
		console.log('-> start', arguments);
		utils.user.carrierAd.create(data.carrierAd[0]);
	});

	it('should retrieve my ads', function() {
		console.log('-> start', arguments);
		browser.get(data.mainUrl);
		element(by.css('menu-bar')).click();
		browser.sleep(5000);	
		element(by.linkText('Mes véhicules')).click();
		browser.sleep(5000);
		browser.refresh();
		browser.sleep(5000);
		element(by.css('truck-list img')).click();
		expect(browser.getCurrentUrl()).toEqual(
			`${data.mainUrl}${user.login.toLowerCase()}/truck/${truck.name}`
		);
	});	

	
});
