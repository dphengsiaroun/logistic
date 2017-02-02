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
	controller: function LgDimensionCtrl(lgScroll) {
		'ngInject';
		console.log('LgDimensionCtrl');
		var ctrl = this;

		ctrl.start = function() {
			console.log('start', arguments);
			ctrl.state = 'editState';
			lgScroll.save();
		};

		ctrl.stop = function() {
			ctrl.state = 'outsideState';
			lgScroll.restore();
			ctrl.months = [];
		};

		ctrl.update = function(dimension) {
			ctrl.dimension = dimension;
			ctrl.ngModel.$setViewValue(dimension);
			ctrl.ngModel.$render();
			ctrl.ngModel.$setTouched();
		};

		ctrl.cancel = function() {
			ctrl.update(undefined);
			ctrl.stop();
		};
	},
	bindings: {
		
	}
});

