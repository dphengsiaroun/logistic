'use strict';

const path = require('path');
const fs = require('fs');
const data = require('./data/data.js');
var utils = {};
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
