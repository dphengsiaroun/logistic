import './lg-slider.scss';

module.exports = 'lg-slider';

const app = angular.module(module.exports, []);

import lgSliderHtml from './tmpl/lg-slider.html';

app.component('lgSlider', {
	template: lgSliderHtml,
	bindings: {
		min: '<',
		max: '<',
		step: '<',
		value: '=',
	},
	controller: function LgSliderCtrl($scope, $element, $attrs, $document) {
		'ngInject';
		
		const isHorizontal = ('horizontal' in $attrs);
		
		const ctrl = this;
		const cursor = $element.find('cursor');
		const line = $element.find('line');
		let startX = 0;
		let startY = 0;
		let x = 0;
		let y = 0;
		if (!isHorizontal) {
			const parentHeight = $element.parent()[0].offsetHeight;
			$element.css('height', (parentHeight - 70) + 'px');
		}

		const maxHeight = line[0].offsetHeight;
		const maxWidth = line[0].offsetWidth;
		

		const setCursorAtBeginning = function() {
			let val = ctrl.value;
			
			if (!val || val < ctrl.min) {
				ctrl.value = ctrl.min;
				val = ctrl.min;
			}
			if (val > ctrl.max) {
				ctrl.value = ctrl.max;
				val = ctrl.max;
			}

			
			if (isHorizontal) {
				x = Math.round(((-maxWidth) / (ctrl.max - ctrl.min) * val) +
					((ctrl.max * maxWidth) / (ctrl.max - ctrl.min)));
				cursor.css({
					left: x + 'px',
				});
			} else {
				y = Math.round(((-maxHeight) / (ctrl.max - ctrl.min) * val) +
					((ctrl.max * maxHeight) / (ctrl.max - ctrl.min)));
				cursor.css({
					top: y + 'px',
				});
			}


		};

		ctrl.$onInit = function() {


			$scope.$watch('$ctrl.value', () => {
				setCursorAtBeginning();
			});
			if (ctrl.min === undefined) {
				ctrl.min = 0;
			}
			if (ctrl.max === undefined) {
				ctrl.max = 100;
			}


		};

		ctrl.update = function(val) {
			
			ctrl.value = val;
		};

		const start = function(e) {
			if (isHorizontal) {
				startX = e.pageX - x;
			} else {
				startY = e.pageY - y;
			}
		};

		const move = function(e) {
			let val;
			if (isHorizontal) {
				x = e.pageX - startX;
				x = (x < 0) ? 0 : x;
				x = (x > maxWidth) ? maxWidth : x;
				cursor.css({
					left: x + 'px',
				});
				val = Math.round((ctrl.max - ctrl.min) * ((+x) / maxWidth) + ctrl.min);
			} else {
				y = e.pageY - startY;
				y = (y < 0) ? 0 : y;
				y = (y > maxHeight) ? maxHeight : y;
				cursor.css({
					top: y + 'px',
				});
				val = Math.round((ctrl.max - ctrl.min) * ((maxHeight - y) / maxHeight) + ctrl.min);

			}
			val = Math.round(val / ctrl.step) * ctrl.step;
			ctrl.update(val);
			$scope.$parent.$digest();
		};

		const touchmove = function(event) {
			event.preventDefault();
			const touch = event.changedTouches[0];
			move(touch);
		};

		const touchstart = function(event) {
			
			event.preventDefault();
			const touch = event.changedTouches[0];
			
			start(touch);
		};
		const touchend = function(event) {
			
			touchmove(event);
		};

		const touchcancel = function(event) {
			
		};
		cursor.on('touchstart', touchstart);
		cursor.on('touchend', touchend);
		cursor.on('touchmove', touchmove);
		cursor.on('touchcancel', touchcancel);

		const mousemove = function(event) {
			// 
			event.preventDefault();
			move(event);
		};

		const mouseup = function(event) {
			
			event.preventDefault();
			$document.off('mousemove');
			$document.off('mouseup');
		};

		const mousedown = function(event) {
			
			event.preventDefault();
			start(event);
			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
		};

		cursor.on('mousedown', mousedown);

	}
});
