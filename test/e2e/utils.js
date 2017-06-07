'use strict';

var utils = {};
module.exports = utils;

utils.selectCity = function() {
	element(by.css('lg-city[name=city]')).click();
	element(by.xpath('//formx[@class="ad"]//b[.="Abi Youcef"]')).click();
};
