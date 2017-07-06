'use strict';

const utils = require('./utils.js');
const data = require('./data/data.js');
var truck = data.trucks[1];

describe('Truck CRUD', function() {

	beforeEach(function() {
		console.log('Proposal CRUD', arguments);
	});

	afterEach(function() {
		browser.manage().logs().get('browser').then(function(browserLog) {
			if (browserLog.length > 0) {
				console.log('browserLog', browserLog);
			}
			expect(browserLog.length).toEqual(0);
		});
	});

	it('should create a proposal', function() {
		console.log('-> create a proposal', arguments);
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
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/meme/truck');
	});

	it('should retrieve truck', function() {
		console.log('-> retrieve a truck', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.css('menu-bar')).click();
		element(by.linkText('Mes véhicules')).click();
		element(by.css('img')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/meme/truck/' + truck.name + '');
	});

	it('should update a truck', function() {
		console.log('-> update a truck', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.css('menu-bar')).click();
		element(by.linkText('Mes véhicules')).click();
		element(by.css('img')).click();
		element(by.id('pr-update-button')).click();
		element(by.name('model')).clear().sendKeys('Renault');
		element(by.id('pr-update-button-confirm')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/meme/truck');
	});

	it('should delete a truck', function() {
		console.log('-> delete truck', arguments);
		browser.get('http://localhost:8000/app/');
		element(by.css('menu-bar')).click();
		element(by.linkText('Mes véhicules')).click();
		element(by.css('img')).click();
		element(by.linkText('Supprimer ce véhicule')).click();
		element(by.css('button.confirm')).click();
		element(by.css('button.ok')).click();
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/meme/truck');
	});
});
