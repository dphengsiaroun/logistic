require('angular/angular-csp.css');
require('font-awesome/css/font-awesome.css');

const $ = require('jquery');
window.jQuery = $;
window.$ = $;

require('angular');
require('angular-touch');
require('angular-i18n/angular-locale_fr-dz.js');
require('angular-sanitize');
require('angular-ui-router');
require('angular-ui-mask');
require('angular-recaptcha');

window.values = function(obj) {
	return Object.keys(obj).map(function(key) {
		return obj[key];
	});
};

window.makeMap = function(array) {
	const map = {};
	array.forEach(function(n) {
		map[n.id] = n;
	});
	return map;
};
