'use strict';

require('./lg-slider.scss');

module.exports = 'lg-slider';

var app = angular.module(module.exports, []);

var lgSliderUrl = require('./tmpl/lg-slider.html');

app.component('lgSlider', {
	require: {
		ngModel: 'ngModel',
	},
	templateUrl: lgSliderUrl,
	controller: function LgSliderCtrl($element, $attrs) {
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
			var val = ctrl.ngModel.$viewValue;
			if (!val || val < ctrl.min) {
				ctrl.ngModel.$setViewValue(ctrl.min);
				val = ctrl.min;
			}
			if (val > ctrl.max) {
				ctrl.ngModel.$setViewValue(ctrl.max);
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
			ctrl.ngModel.$render = function() {
				console.log('LgSliderCtrl ctrl.ngModel.$render', arguments);
				setCursorAtBeginning();
			};
			if (ctrl.min === undefined) {
				ctrl.min = 0;
			};
			if (ctrl.max === undefined) {
				ctrl.max = 100;
			};


		};

		ctrl.update = function(val) {
			ctrl.ngModel.$setViewValue(val);
			ctrl.ngModel.$setTouched();
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
			cursor.on('mousemove', mousemove);
			cursor.on('mouseup', mouseup);
		};

		var mousemove = function(event) {
			console.log('mousemove', arguments);
			event.preventDefault();
			move(event);
		};

		var mouseup = function(event) {
			console.log('mouseup', arguments);
			event.preventDefault();
			cursor.off('mousemove');
			cursor.off('mouseup');
		};

		cursor.on('mousedown', mousedown);

	},
	bindings: {
		min: '<',
		max: '<',
		step: '<',
	}
});

