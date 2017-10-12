import './lg-orderby.scss';
module.exports = 'lg-orderby';

const app = angular.module(module.exports, []);


import lgOrderbyHtml from './tmpl/lg-orderby.html';

app.component('lgOrderby', {
	template: lgOrderbyHtml,
	controller: function lgOrderby() {
		'ngInject';
		
	},
	bindings: {
		order: '=',
	}
});
