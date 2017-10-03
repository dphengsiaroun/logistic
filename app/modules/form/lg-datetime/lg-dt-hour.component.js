import './lg-dt-hour.scss';
import lgDtHourHtml from './tmpl/lg-dt-hour.html';

function makeRange(start, end) {
	return Array.apply(null, Array(end - start + 1)).map(function(n, i) {
		return i + start;
	});
}

export const lgDtHour = {
	require: {
		lgDatetime: '^^lgDatetime'
	},
	template: lgDtHourHtml,
	controller: function LgDtHourCtrl($scope, $element, $timeout, $window) {
		'ngInject';
		const ctrl = this;
		let hourElt;
		let isUpdating = false;
		const width = screen.width;
		const hourRange = makeRange(0, 23);

		ctrl.hourRange = hourRange;

		let isScrolling = false;

		function onScroll() {
			if (isUpdating === true) {
				console.log('onScroll set isUpdating to false');
				isUpdating = false;
				return;
			}
			console.log('onScroll', arguments);
			if (isScrolling === false) {
				isScrolling = true;
				$timeout(function() {
					ctrl.swipe();
					$scope.$apply();
					isScrolling = false;
				}, 100, false);
			}
		}

		ctrl.update = function(hour, $index) {
			console.log('LgDtHourCtrl update', arguments);
			isUpdating = true;
			console.log('width', width);
			let pos = (0 + $index * 1.3) * width / 44;
			if ($window.mobilecheck()) {
				pos = (0 + $index * 1.3) * width / 10;
			}
			console.log('hourElt[0].scrollLeft', hourElt[0].scrollLeft);
			console.log('pos', pos);
			hourElt[0].scrollLeft = pos;
			console.log('hourElt[0].scrollLeft', hourElt[0].scrollLeft);			
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
				const $index = ctrl.hourRange.indexOf(ctrl.lgDatetime.selectedHours);
				$timeout(function() {
					ctrl.update(ctrl.hourRange[0], $index);
				}, 0);
			} else {
				const $index = ctrl.hourRange.indexOf(ctrl.lgDatetime.selectedHours);
				$timeout(function() {
					ctrl.update(ctrl.lgDatetime.selectedHours, $index);
				}, 0);
			}
		});

		ctrl.swipe = function() {
			console.log('swipe', arguments);
			const pos = hourElt[0].scrollLeft / width;
			console.log('pos', pos);
			const $index = Math.round(((pos - 0) * 99 / (12.9875 - 0)));
			console.log('$index', $index);
			const hour = ctrl.hourRange[$index];
			ctrl.update(hour, $index);
		};

	},
	bindings: {
		hours: '<'
	}
};