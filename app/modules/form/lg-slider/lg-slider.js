require('./lg-slider.scss');

module.exports = 'lg-slider';

const app = angular.module(module.exports, []);

const lgSliderUrl = require('./tmpl/lg-slider.html');

app.component('lgSlider', {
	template: lgSliderUrl,
	bindings: {
		min: '<',
		max: '<',
		step: '<',
		value: '=',
	},
	controller: function LgSliderCtrl($scope, $element, $attrs, $document) {
		'ngInject';
		console.log('LgSliderCtrl', arguments);
		const isHorizontal = ('horizontal' in $attrs);
		console.log('isHorizontal', isHorizontal);
		const ctrl = this;
		const cursor = $element.find('cursor');
		const line = $element.find('line');
		let startX = 0;
		let startY = 0;
		let x = 0;
		let y = 0;
		if (!isHorizontal) {
			const parentHeight = $element.parent().height();
			$element.css('height', (parentHeight - 70) + 'px');
		}

		const maxHeight = line.height();
		const maxWidth = line.width();
		console.log('maxWidth', maxWidth);

		const setCursorAtBeginning = function() {
			let val = ctrl.value;
			console.log('setCursorAtBeginning val', val);
			if (!val || val < ctrl.min) {
				ctrl.value = ctrl.min;
				val = ctrl.min;
			}
			if (val > ctrl.max) {
				ctrl.value = ctrl.max;
				val = ctrl.max;
			}

			console.log('setCursorAtBeginning val', val);
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
			console.log('update', val);
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
			console.log('touchstart', arguments);
			event.preventDefault();
			const touch = event.changedTouches[0];
			console.log('touch', touch);
			start(touch);
		};
		const touchend = function(event) {
			console.log('touchend', arguments);
			touchmove(event);
		};

		const touchcancel = function(event) {
			console.log('touchcancel', arguments);
		};
		cursor.on('touchstart', touchstart);
		cursor.on('touchend', touchend);
		cursor.on('touchmove', touchmove);
		cursor.on('touchcancel', touchcancel);

		const mousemove = function(event) {
			// console.log('mousemove', arguments);
			event.preventDefault();
			move(event);
		};

		const mouseup = function(event) {
			console.log('mouseup', arguments);
			event.preventDefault();
			$document.off('mousemove');
			$document.off('mouseup');
		};

		const mousedown = function(event) {
			console.log('mousedown', arguments);
			event.preventDefault();
			start(event);
			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
		};

		cursor.on('mousedown', mousedown);

	}
});
