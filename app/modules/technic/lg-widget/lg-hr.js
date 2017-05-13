'use strict';

require('./lg-hr.scss');
module.exports = 'lg-widget';

var app = angular.module(module.exports);

var lgHrUrl = require('./tmpl/lg-hr.html');

app.component('lgHr', {
	transclude: true,
	templateUrl: lgHrUrl,
});
