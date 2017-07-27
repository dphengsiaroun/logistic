const app = angular.module('lg-datetime');

const lgDtHourUrl = require('./tmpl/lg-dt-hour.html');

function makeRange(start, end) {
	return Array.apply(null, Array(end - start + 1)).map(function(n, i) {
		return i + start;
	});
}

app.component('lgDtHour', {
	require: {
		lgDatetime: '^^lgDatetime'
	},
	templateUrl: lgDtHourUrl,
	controller: function LgDtHourCtrl($scope, $element, $window, $timeout) {
		const ctrl = this;
		let hourElt;
		let isUpdating = false;
		const width = screen.width;
		const hourRange = makeRange(0, 23);

		ctrl.hourRange = hourRange;

		ctrl.update = function(hour, $index) {
			console.log('LgDtHourCtrl update', arguments);
			isUpdating = true;
			console.log('width', width);
			const pos = (0 + $index * 1.3) * width/10;
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
			const $index = ctrl.hourRange.indexOf(ctrl.lgDatetime.selectedHours);
			$timeout(function() {
				ctrl.update(ctrl.lgDatetime.selectedHours, $index);
			}, 0);
		});

		$scope.$watch('$ctrl.lgDatetime.selectedDate', function() {
			console.log('LgDtHourCtrl $watch $ctrl.lgDatetime.selectedDate', arguments);
			const opts = ctrl.lgDatetime.opts;
			if (ctrl.lgDatetime.selectedDate === undefined) {
				return;
			}
			if (ctrl.lgDatetime.selectedDate.toDateString() === opts.start.toDateString()) {
				if (opts.after) {
					ctrl.hourRange = makeRange(opts.start.getHours(), 23);
				} else {
					ctrl.hourRange = makeRange((opts.start.getHours() + 1) % 24, 23);
				}
			} else {
				ctrl.hourRange = hourRange;
			}
			if (ctrl.hourRange.indexOf(ctrl.lgDatetime.selectedHours) === -1) {
				var $index = ctrl.hourRange.indexOf(ctrl.lgDatetime.selectedHours);
				$timeout(function() {
					ctrl.update(ctrl.hourRange[0], $index);
				}, 0);
			} else {
				var $index = ctrl.hourRange.indexOf(ctrl.lgDatetime.selectedHours);
				$timeout(function() {
					ctrl.update(ctrl.lgDatetime.selectedHours, $index);
				}, 0);
			}
		});

		ctrl.swipe = function() {
			console.log('swipe', arguments);
			const pos = hourElt[0].scrollLeft/width;
			console.log('pos', pos);
			const $index = Math.round(((pos-0) * 99/(12.9875-0)));
			console.log('$index', $index);
			const hour = ctrl.hourRange[$index];
			ctrl.update(hour, $index);
		};

		let isScrolling = false;

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
		hours: '<'
	}
});

