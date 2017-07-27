'use strict';

const path = require('path');
const fs = require('fs');
const data = require('./data/data.js');
const utils = {};
const truck = data.trucks[1];
const user = data.users[0];
const carrierAd = data.carrierAd[0];
module.exports = utils;

utils.lgCitySelect = function(name, city) {
	const lgCityElt = element(by.css(`lg-city[name=${name}]`));
	lgCityElt.click();
	element(by.xpath(`//lg-city[@name='${name}']//b[.="${city}"]`)).click();
	console.log(name, city);
};

utils.lgSelect = function(name, value) {
	element(by.css(`[name=${name}] lg-option[value=${value}]`)).click();
};

utils.lgChoiceSelect = function(name, choice) {
	element(by.css(`lg-choice my-input[name=${name}]`)).click();
	element(by.xpath(`//lg-choice//span[.="${choice}"]`)).click();
};

utils.lgUploadSelect = function(name, p) {
	element(by.css('lg-upload input[type="file"]')).sendKeys(p);
	browser.sleep(1000);
};

utils.isDirectoryExisting = function(p) {
	const absPath = path.resolve(__dirname, p);
	return fs.existsSync(absPath);
};

utils.user = {};
utils.user.create = function(user) {
	browser.get('http://localhost:8000/app/');
	element(by.css('menu-bar')).click();
	element(by.linkText('Se connecter')).click();
	element(by.linkText('Créer un nouveau compte')).click();
	element(by.name('lastname')).clear().sendKeys(user.lastname);
	element(by.name('firstname')).clear().sendKeys(user.firstname);
	element(by.name('login')).clear().sendKeys(user.login);
	element(by.name('email')).clear().sendKeys(user.email);
	utils.lgSelect('profile', user.profile);
	element(by.name('street')).clear().sendKeys(user.street);
	element(by.name('zipcode')).clear().sendKeys(user.zipcode);
	element(by.name('city')).clear().sendKeys(user.city);
	element(by.name('phone')).clear().sendKeys(user.phone);
	utils.lgChoiceSelect('country', user.country);
	element(by.css('lg-eyepassword input[type="password"]')).clear().sendKeys(user.password);
	browser.sleep(5000);
	element(by.id('pr-create-user-button')).click();
	const message = element(by.css('h2'));
	expect(message.getText()).toEqual('Votre compte est créé.');
	element(by.css('button')).click();
	const userIdentity = element(by.css('.user-identity')).getText();
	expect(userIdentity).toEqual(`${user.firstname} ${user.lastname.toUpperCase()}`);
};

utils.user.truck = {};
utils.user.truck.create = function(truck) {
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
};

utils.user.truck.retrieve = function(user, truck) {
	browser.get('http://localhost:8000/app/');
	element(by.css('menu-bar')).click();
	element(by.linkText('Mes véhicules')).click();
	element(by.css('img')).click();
	expect(browser.getCurrentUrl()).toEqual(
		`http://localhost:8000/app/${user.login.toLowerCase()}/truck/${truck.name}`
	);
};

utils.user.truck.update = function(user, truck) {
	browser.get('http://localhost:8000/app/');
	element(by.css('menu-bar')).click();
	element(by.linkText('Mes véhicules')).click();
	element(by.css('img')).click();
	element(by.id('pr-update-button')).click();
	element(by.name('model')).clear().sendKeys('Renault');
	element(by.id('pr-update-button-confirm')).click();
	element(by.css('button.ok')).click();
	expect(browser.getCurrentUrl()).toEqual(`http://localhost:8000/app/${user.login.toLowerCase()}/truck`);
};

utils.user.truck.delete = function(user, truck) {
	browser.get('http://localhost:8000/app/');
	element(by.css('menu-bar')).click();
	element(by.linkText('Mes véhicules')).click();
	element(by.css('.img-fix')).click();
	element(by.linkText('Supprimer ce véhicule')).click();
	element(by.css('button.confirm')).click();
	element(by.css('button.ok')).click();
	expect(browser.getCurrentUrl()).toEqual(`http://localhost:8000/app/${user.login.toLowerCase()}/truck`);
};

utils.user.carrierAd = {};
utils.user.carrierAd.create = function(carrierAd) {
	browser.get('http://localhost:8000/app/');
		element(by.id('pr-create-carrier-ad-button')).click();
		element(by.id('pr-select-truck-link')).click();
		element(by.id('truck-' + carrierAd.truck.name)).click();
		element(by.id('pr-select-availabilities')).click();
		element(by.id('pr-availability-total')).click();
		element(by.id('pr-select-price')).click();
		// browser.sleep(5000);
		element(by.name('priceWantedPerKm')).sendKeys(carrierAd.priceWantedPerKm);
		element(by.id('pr-add-pricing-button')).click();
		element(by.id('pr-create-carrier-button-confirm')).click();
		element(by.css('button')).click();
		console.log('-> Carrier ad created', arguments);
		expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/ads/carriers');
};


utils.logout = function() {
	browser.get('http://localhost:8000/app/');
	element(by.css('logo')).click();
	element(by.css('menu-bar.fa.fa-bars')).click();
	element(by.linkText('Se déconnecter')).click();
	element(by.css('button.yes')).click();

	const userIdentity = element(by.css('.user-identity')).getText();
	expect(userIdentity).toEqual('');
};

utils.createLoaderAd = function(loaderAd) {
	browser.get('http://localhost:8000/app/');
	element(by.id('pr-create-loader-ad-button')).click();
	utils.lgSelect('transportCategory', loaderAd.transportCategory);
	utils.lgChoiceSelect('transportTruckType', loaderAd.transportTruckType);
	utils.lgCitySelect('departureCity', loaderAd.departureCity);
	utils.lgCitySelect('arrivalCity', loaderAd.arrivalCity);
	utils.lgSelect('conditioning', loaderAd.conditioning);
	utils.lgChoiceSelect('typeOfGoods', loaderAd.typeOfGoods);
	utils.lgChoiceSelect('weightIntervals', loaderAd.weightIntervals);
	element(by.name('preciseWeight')).sendKeys(loaderAd.preciseWeight);
	utils.lgUploadSelect('imageId', loaderAd.imageId);
	element(by.name('priceWanted')).sendKeys(loaderAd.priceWanted);
	element(by.name('title')).sendKeys(loaderAd.title);
	element(by.id('pr-button-create-loader-ad')).click();
	element(by.css('button.ok')).click();
	expect(browser.getCurrentUrl()).toEqual('http://localhost:8000/app/ads/loaders');
};

