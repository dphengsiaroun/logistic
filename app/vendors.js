import 'angular/angular-csp.css';
import 'font-awesome/css/font-awesome.css';

import 'angular';
import 'angular-touch';
import 'angular-i18n/angular-locale_fr-dz.js';
import 'angular-sanitize';
import 'angular-ui-router';
import 'angular-ui-mask';
import 'angular-recaptcha';

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
