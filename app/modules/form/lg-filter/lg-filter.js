require('./lg-filter.scss');
module.exports = 'lg-filter';

const app = angular.module(module.exports, ['lg-misc']);


const lgFilterUrl = require('./tmpl/lg-filter.html');

app.component('lgFilter', {
	templateUrl: lgFilterUrl,
	controller: function LgFilterCtrl() {
		'ngInject';
		const ctrl = this;
		
	},
	bindings: {
		
	}
});

