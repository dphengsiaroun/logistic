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
		var cursor = $element.find('cursor');
		var startY = 0;
		var y = 0;

		var touchstart = function(event) {
			console.log('touchstart', arguments);
			event.preventDefault();
			var touch = event.changedTouches[0];
			console.log('touch', touch);
			startY = touch.pageY - y;
		};
		var touchend = function(event) {
			console.log('touchend', arguments);
		};
		var touchmove = function(event) {
			console.log('touchmove', arguments);
			event.preventDefault();
			var touch = event.changedTouches[0];
			y = touch.pageY - startY;
			y = (y < 0) ? 0 : y;
			y = (y > 300) ? 300 : y;
			cursor.css({
				top: y + 'px',
			});
		};
		var touchcancel = function(event) {
			console.log('touchcancel', arguments);
		};
		cursor.on('touchstart', touchstart);
		cursor.on('touchend', touchend);
		cursor.on('touchmove', touchmove);
		cursor.on('touchcancel', touchcancel);
	}
});

