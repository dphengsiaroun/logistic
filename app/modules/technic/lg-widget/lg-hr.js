'use strict';

require('./lg-hr.scss');
module.exports = 'lg-widget';

const app = angular.module(module.exports);

const lgHrHtml = require('./tmpl/lg-hr.html');

app.component('lgHr', {
	transclude: true,
	template: lgHrHtml,
});
