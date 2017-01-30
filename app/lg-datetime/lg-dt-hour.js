'use strict';

var app = angular.module('lg-datetime');

var lgDtHourUrl = require('./tmpl/lg-dt-hour.html');

app.component('lgDtHour', {
	require: {
		lgDatetime: '^^lgDatetime'
	},
	templateUrl: lgDtHourUrl,
	controller: function LgDtHourCtrl($scope, $element, $window) {
		var ctrl = this;
		var hourElt;
		var lineElt;
		var isUpdating = false;
		var width = screen.width;
		ctrl.update = function(hour) {
			console.log('LgDtHourCtrl update', arguments);
			isUpdating = true;
			console.log('width', width);
			hourElt[0].scrollLeft = (0 + hour * 1.73) * width/10;
			this.action.apply(null, [hour]);
		};

		ctrl.$onInit = function() {
			console.log('LgDtHourCtrl $onInit', arguments);
			hourElt = $element.find('hours');
			lineElt = hourElt.find('line');
			hourElt[0].onscroll = onScroll;
		};

		$scope.$watch('$ctrl.lgDatetime.state', function() {
			ctrl.update(ctrl.selectedHours);
		});

		ctrl.swipe = function() {
			console.log('swipe', arguments);
			var pos = hourElt[0].scrollLeft;
			console.log('pos', pos);
			var hour = Math.round(((pos) * 5.8) / width);
			console.log('hour', hour);
			ctrl.update(hour);
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
		action: '<',
		selectedHours: '<'
	}
});

