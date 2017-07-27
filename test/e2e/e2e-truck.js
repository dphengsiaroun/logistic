'use strict';

const utils = require('./utils.js');
const data = require('./data/data.js');
const truck = data.trucks[1];
const user = data.users[0];

describe('Truck CRUD', function() {

	beforeEach(function() {
		console.log('Truck CRUD', arguments);
	});

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			if (browserLog.length > 0) {
				console.log('browserLog', browserLog);
			}
			expect(browserLog.length).toEqual(0);
		});
	});

	it('should create a truck', function() {
		console.log('-> create a truck', arguments);
		utils.user.truck.create(truck);
	});

	it('should retrieve truck', function() {
		console.log('-> retrieve a truck', arguments);
		utils.user.truck.retrieve(user, truck);
	});

	it('should update a truck', function() {
		console.log('-> update a truck', arguments);
		utils.user.truck.update(user, truck);
	});

	it('should delete a truck', function() {
		console.log('-> delete truck', arguments);
		utils.user.truck.delete(user, truck);
	});
});
