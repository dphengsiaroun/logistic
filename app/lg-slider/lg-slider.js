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
	controller: function LgSliderCtrl($element) {
		'ngInject';
		console.log('LgSliderCtrl');
		var ctrl = this;
		var cursor = $element.find('cursor');
		var line = $element.find('line');
		var startY = 0;
		var y = 0;
		var maxHeight = line.height();
		console.log('maxHeight', maxHeight);

		ctrl.update = function(val) {
			ctrl.ngModel.$setViewValue(val);
			ctrl.ngModel.$render();
			ctrl.ngModel.$setTouched();
		};

		var start = function(e) {
			console.log('start', arguments);
			startY = e.pageY - y;
		};

		var move = function(e) {
			console.log('start', arguments);
			y = e.pageY - startY;
			y = (y < 0) ? 0 : y;
			y = (y > maxHeight) ? maxHeight : y;
			cursor.css({
				top: y + 'px',
			});
			ctrl.update(y);
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


	}
});

