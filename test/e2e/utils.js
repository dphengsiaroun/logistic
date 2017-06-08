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

utils.lgUploadSelect = function(name, path) {
	element(by.css('lg-upload input[type="file"]')).sendKeys(path);
	browser.sleep(1000);
};

utils.isDirectoryExisting = function(p) {
	const absPath = path.resolve(__dirname, p);
	return fs.existsSync(absPath);
};
