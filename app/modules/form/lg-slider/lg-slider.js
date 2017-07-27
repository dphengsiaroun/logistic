require('./lg-slider.scss');

module.exports = 'lg-slider';

const app = angular.module(module.exports, []);

const lgSliderUrl = require('./tmpl/lg-slider.html');

app.component('lgSlider', {
	templateUrl: lgSliderUrl,
	bindings: {
		min: '<',
		max: '<',
		step: '<',
		value: '=',
	},
	controller: function LgSliderCtrl($scope, $element, $attrs, $document) {
		'ngInject';
		console.log('LgSliderCtrl', arguments);
		var isHorizontal = ('horizontal' in $attrs);
		console.log('isHorizontal', isHorizontal);
		var ctrl = this;
		var cursor = $element.find('cursor');
		var line = $element.find('line');
		var startX = 0;
		var startY = 0;
		var x = 0;
		var y = 0;
		if (!isHorizontal) {
			var parentHeight = $element.parent().height();
			$element.css('height', (parentHeight - 70) + 'px');
		}

		var maxHeight = line.height();
		var maxWidth = line.width();
		console.log('maxWidth', maxWidth);

		var setCursorAtBeginning = function() {
			var val = ctrl.value;
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
			};
			if (ctrl.max === undefined) {
				ctrl.max = 100;
			};


		};

		ctrl.update = function(val) {
			console.log('update', val);
			ctrl.value = val;
		};

		var start = function(e) {
			if (isHorizontal) {
				startX = e.pageX - x;
			} else {
				startY = e.pageY - y;
			}
		};

		var move = function(e) {
			var val;
			if (isHorizontal) {
				x = e.pageX - startX;
				x = (x < 0) ? 0 : x;
				x = (x > maxWidth) ? maxWidth : x;
				cursor.css({
					left: x + 'px',
				});
				val = Math.round((ctrl.max - ctrl.min) * (( + x) / maxWidth) + ctrl.min);
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


		var touchstart = function(event) {
			console.log('touchstart', arguments);
			event.preventDefault();
			var touch = event.changedTouches[0];
			console.log('touch', touch);
			start(touch);
		};
		var touchend = function(event) {
			console.log('touchend', arguments);
			touchmove(event);
		};
		var touchmove = function(event) {
			event.preventDefault();
			var touch = event.changedTouches[0];
			move(touch);
		};
		var touchcancel = function(event) {
			console.log('touchcancel', arguments);
		};
		cursor.on('touchstart', touchstart);
		cursor.on('touchend', touchend);
		cursor.on('touchmove', touchmove);
		cursor.on('touchcancel', touchcancel);

		var mousedown = function(event) {
			console.log('mousedown', arguments);
			event.preventDefault();
			start(event);
			$document.on('mousemove', mousemove);
			$document.on('mouseup', mouseup);
		};

		var mousemove = function(event) {
			// console.log('mousemove', arguments);
			event.preventDefault();
			move(event);
		};

		var mouseup = function(event) {
			console.log('mouseup', arguments);
			event.preventDefault();
			$document.off('mousemove');
			$document.off('mouseup');
		};

		cursor.on('mousedown', mousedown);

	}
});

