import './lg-orderby.scss';
module.exports = 'lg-orderby';

const app = angular.module(module.exports, []);


const lgOrderbyHtml = require('./tmpl/lg-orderby.html');

app.component('lgOrderby', {
	template: lgOrderbyHtml,
	controller: function lgOrderby() {
		'ngInject';
		const ctrl = this;
		console.log('orderby ctrl');

	},
	bindings: {
		order: '='
	}
});
