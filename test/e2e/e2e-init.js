'use strict';

const utils = require('./utils.js');
const data = require('./data/data.js');
const user = data.users[0];

describe('Init', function() {

	beforeEach(function() {
		console.log('Init', arguments);
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
		console.log('-> create a user', arguments);
		utils.user.create(user);
	});
});
