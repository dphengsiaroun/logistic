'use strict';

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
