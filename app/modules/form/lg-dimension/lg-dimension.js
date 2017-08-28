import './lg-dimension.scss';

module.exports = 'lg-dimension';

const app = angular.module(module.exports, []);

import lgDimensionHtml from './tmpl/lg-dimension.html';

app.component('lgDimension', {
	require: {
		ngModel: 'ngModel',
	},
	template: lgDimensionHtml,
	controller: function LgDimensionCtrl($scope, $element, $document, $filter, lgScroll) {
		'ngInject';
		console.log('LgDimensionCtrl');
		const ctrl = this;
		ctrl.coef = 0.429;
		const settingsElt = $element.find('settings');
		const width = screen.width;
		console.log('LgDimensionCtrl width', width);
		const top = 59 + (106 / 320) * width + 55 + 20;
		settingsElt.css('top', top + 'px');

		const fixedElt = $element.find('lg-edit');
		fixedElt.on('touchmove', function(e) {
			e.preventDefault();
		});


		ctrl.start = function() {
			console.log('start', arguments);
			ctrl.state = 'editState';
			lgScroll.save();
		};

		ctrl.stop = function() {
			const dimension = {
				width: ctrl.width / 100,
				height: ctrl.height / 100,
				depth: ctrl.depth / 100,
			};
			ctrl.update(dimension);
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
					ctrl.ngModel.$setViewValue(ctrl.dimension);
				}
				ctrl.width = Math.round(ctrl.dimension.width * 100);
				ctrl.height = Math.round(ctrl.dimension.height * 100);
				ctrl.depth = Math.round(ctrl.dimension.depth * 100);
				ctrl.volumeStr = $filter('volume')(ctrl.dimension);
			};
			$scope.$watchGroup(['$ctrl.width', '$ctrl.height', '$ctrl.depth'], () => {
				console.log('$ctrl.dimension watch');
				const dimension = {
					width: ctrl.width / 100,
					height: ctrl.height / 100,
					depth: ctrl.depth / 100,
				};
				ctrl.update(dimension);
			}, true);
		};
	},
	bindings: {
		title: '@',
	}
});

