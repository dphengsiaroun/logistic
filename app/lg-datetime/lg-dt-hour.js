'use strict';

var app = angular.module('lg-datetime');

var lgDtHourUrl = require('./tmpl/lg-dt-hour.html');

app.component('lgDtHour', {
	require: {
		lgDatetime: '^^lgDatetime'
	},
	templateUrl: lgDtHourUrl,
	controller: function LgDtHourCtrl($scope, $element, $window, $timeout) {
		var ctrl = this;
		var hourElt;
		var isUpdating = false;
		var width = screen.width;

		ctrl.update = function(hour, $index) {
			console.log('LgDtHourCtrl update', arguments);
			isUpdating = true;
			console.log('width', width);
			var pos = (0 + $index * 1.3) * width/10;
			console.log('pos', pos);
			hourElt[0].scrollLeft = pos;
			ctrl.lgDatetime.setHours(hour);
		};

		ctrl.$onInit = function() {
			console.log('LgDtHourCtrl $onInit', arguments);
			hourElt = $element.find('hours');
			hourElt[0].onscroll = onScroll;
			ctrl.lgDatetime.lgDtHour = ctrl;
		};

		$scope.$watch('$ctrl.lgDatetime.state', function() {
			console.log('LgDtHourCtrl $watch', arguments);
			var $index = ctrl.hours.indexOf(ctrl.selectedHours);
			$timeout(() => {
				ctrl.update(ctrl.selectedHours, $index);
			}, 0);
		});

		ctrl.swipe = function() {
			console.log('swipe', arguments);
			var pos = hourElt[0].scrollLeft/width;
			console.log('pos', pos);
			var $index = Math.round(((pos-0) * 99/(12.9875-0)));
			console.log('$index', $index);
			var hour = ctrl.hours[$index];
			ctrl.update(hour, $index);
		};

		var isScrolling = false;

		var onScroll = function() {
			if (isUpdating === true) {
				console.log('onScroll set isUpdating to false');
				isUpdating = false;
				return;
			}
			console.log('onScroll', arguments);
			if (isScrolling === false) {
				isScrolling = true;
				setTimeout(function() {
					ctrl.swipe();
					$scope.$apply();
					isScrolling = false;
				}, 100);
			}
		};

	},
	bindings: {
		selectedHours: '<',
		hours: '<'
	}
});

