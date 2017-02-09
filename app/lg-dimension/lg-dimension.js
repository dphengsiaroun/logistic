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
		ctrl.coef = 0.429;

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

		ctrl.$onInit = function() {
			console.log('LgDimensionCtrl');


			ctrl.ngModel.$render = function() {

				ctrl.dimension = ctrl.ngModel.$viewValue;
				if (ctrl.dimension === undefined) {
					ctrl.dimension = {
						width: 0.6,
						height: 0.7,
						depth: 0.8,
					};
				}
				ctrl.width = ctrl.dimension.width * 100;
				ctrl.height = ctrl.dimension.height * 100;
				ctrl.depth = ctrl.dimension.depth * 100;


			};
		};
	},
	bindings: {
		title: '@',
	}
});

