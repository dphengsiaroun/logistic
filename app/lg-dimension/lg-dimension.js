'use strict';

require('./lg-dimension.scss');

module.exports = 'lg-dimension';

var app = angular.module(module.exports, []);

var lgDimensionUrl = require('./tmpl/lg-dimension.html');

app.component('lgDimension', {
	require: {
		ngModel: 'ngModel',
	},
	templateUrl: lgDimensionUrl,
	controller: function LgDimensionCtrl() {
		'ngInject';
		console.log('LgDimensionCtrl');
		var ctrl = this;
	},
	bindings: {
		
	}
});

