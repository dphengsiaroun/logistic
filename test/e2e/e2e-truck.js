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
		browser.get('http://localhost:8000/app/');
		element(by.css('menu-bar')).click();
		element(by.linkText('Mes véhicules')).click();
		element(by.id('pr-create-truck-button')).click();
		element(by.name('name')).sendKeys(truck.name);
		element(by.name('model')).sendKeys(truck.model);
		utils.lgCitySelect('city', truck.city);
		utils.lgSelect('transportCategory', truck.transportCategory);
		utils.lgChoiceSelect('transportTruckType', truck.transportTruckType);
		utils.lgChoiceSelect('birthyear', truck.birthyear);
		console.log('truck.imageId', truck.imageId);
		utils.lgUploadSelect('imageId', truck.imageId);
		element(by.id('pr-add-vehicle-button')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual(`http://localhost:8000/app/${user.login.toLowerCase()}/truck`);
	});

	it('should retrieve truck', function() {
		console.log('-> retrieve a truck', arguments);
		utils.retrieveTruck();
	});

	it('should update a truck', function() {
		console.log('-> update a truck', arguments);
		utils.updateTruck();
	});

	it('should delete a truck', function() {
		console.log('-> delete truck', arguments);
		utils.deleteTruck();
	});
});
