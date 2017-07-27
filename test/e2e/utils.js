'use strict';

const path = require('path');
const fs = require('fs');
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
