import'./lg-hr.scss';
module.exports = 'lg-widget';

const app = angular.module(module.exports);

import lgHrHtml from './tmpl/lg-hr.html';

app.component('lgHr', {
	transclude: true,
	template: lgHrHtml,
});
