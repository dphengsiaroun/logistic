'use strict';

require('./lg-hr.css');

module.exports = 'lg-widget';

var app = angular.module(module.exports);

var lgHrUrl = 'lg-widget/tmpl/lg-hr.html';

app.component('lgHr', {
	transclude: true,
	templateUrl: lgHrUrl,
});
