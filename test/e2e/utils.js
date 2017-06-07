'use strict';

const path = require('path');
const fs = require('fs');
var utils = {};
module.exports = utils;

utils.lgCitySelect = function(name, city) {
	element(by.css(`lg-city[name=${name}]`)).click();
	element(by.xpath(`//lg-city//b[.="${city}"]`)).click();
};

utils.lgSelect = function(name, value) {
	element(by.css(`[name=${name}] lg-option[value=${value}]`)).click();
};

utils.lgChoiceSelect = function(name, choice) {
	element(by.css(`lg-choice my-input[name=${name}]`)).click();
	element(by.xpath(`//lg-choice//span[.="${choice}"]`)).click();
};

utils.lgUploadSelect = function(name, path) {
	console.log('path', path);
	element(by.css('lg-upload input[type="file"]')).sendKeys(path);
	browser.sleep(1000);
	// element(by.id('uploadButton')).click();
};

utils.isDirectoryExisting = function(p) {
	const absPath = path.resolve(__dirname, p);
	return fs.existsSync(absPath);
};
