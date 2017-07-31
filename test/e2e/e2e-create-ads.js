const utils = require('./utils.js');
const data = require('./data/data.js');

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

	it('should create a first user', function() {
		console.log('-> create a first user', arguments);
		utils.user.create(data.users[0]);
	});

	it('should create a truck', function() {
		console.log('-> create a truck', arguments);
		utils.user.truck.create(data.trucks[0]);
	});

	it('should create a first Carrier ad', function() {
		console.log('-> create a Carrier ad', arguments);
		utils.user.carrierAd.create(data.carrierAd[0]);
	});

	it('should create a second Carrier ad', function() {
		console.log('-> create a Carrier ad', arguments);
		utils.user.carrierAd.create(data.carrierAd[1]);
	});

	it('should create a first Loader ad', function() {
		console.log('-> create a Loader ad', arguments);
		utils.user.loaderAd.create(data.loaderAd[0]);
	});

	it('should create a second Loader ad', function() {
		console.log('-> create a Loader ad', arguments);
		utils.user.loaderAd.create(data.loaderAd[1]);
	});

	it('should logout', function() {
		console.log('-> logout', arguments);
		utils.logout();
	});

	it('should create a second user', function() {
		console.log('-> create a second user', arguments);
		utils.user.create(data.users[1]);
	});
	
	
});
