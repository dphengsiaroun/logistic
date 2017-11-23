const init = require('./init.js');
const utils = require('../utils.js');
const data = require('../data/data.js');

describe('Create ads for proposal', function() {

	beforeEach(function() {
		console.log('Create ads for proposal', arguments);
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

	it('should create a truck', function() {
		console.log('-> create a truck', arguments);
		utils.user.truck.create(data.trucks[1]);
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

	it('should create a user for proposal', function() {
		console.log('-> create a user for proposal', arguments);
		utils.user.create(data.users[1]);
	});

	it('should logout a user', function() {
		console.log('-> logout the user for proposal', arguments);
		utils.logout();
	});
	
});
