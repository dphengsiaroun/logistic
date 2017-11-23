'use strict';

const init = require('./init.js');
const utils = require('../utils.js');
const data = require('../data/data.js');
const truck = data.trucks[1];
const user = data.users[0];

describe('TRUCK CRUD', function() {

	beforeEach(function() {
		console.log('TRUCK CRUD', arguments);
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

	it('should create a user', function() {
		console.log('-> create a user', arguments);
		utils.user.create(user);
	});

	it('should create a truck', function() {
		console.log('-> create a truck', arguments);
		utils.user.truck.create(truck);
	});

	it('should retrieve truck', function() {
		console.log('-> retrieve a truck', arguments);
		utils.user.truck.retrieve(user, truck);
		browser.sleep(5000);
	});

	it('should update a truck', function() {
		console.log('-> update a truck', arguments);
		utils.user.truck.update(user, truck);
		browser.sleep(5000);
	});

	it('should delete a truck', function() {
		console.log('-> delete truck', arguments);
		utils.user.truck.delete(user, truck);
	});
});
