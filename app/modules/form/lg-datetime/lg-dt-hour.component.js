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
	controller: function LgDtHourCtrl($scope, $element, $timeout, $window, lgMobile) {
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
				
				isUpdating = false;
				return;
			}
			
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
			
			isUpdating = true;
			
			let pos = (0 + $index * 1.6) * width / 38.7;
			if (lgMobile.isMobile()) {
				pos = (0 + $index * 1.3) * width / 10;
			}
			
			
			hourElt[0].scrollLeft = pos;
			
			ctrl.lgDatetime.setHours(hour);
		};

		ctrl.$onInit = function() {
			
			hourElt = $element.find('hours');
			hourElt[0].onscroll = onScroll;
			ctrl.lgDatetime.lgDtHour = ctrl;
		};

		$scope.$watch('$ctrl.lgDatetime.state', function() {
			
			const $index = ctrl.hourRange.indexOf(ctrl.lgDatetime.selectedHours);
			$timeout(function() {
				ctrl.update(ctrl.lgDatetime.selectedHours, $index);
			}, 0);
		});

		$scope.$watch('$ctrl.lgDatetime.selectedDate', function() {
			
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
			
			const pos = hourElt[0].scrollLeft / width;
			
			const $index = Math.round(((pos - 0) * 99 / (12.9875 - 0)));
			
			const hour = ctrl.hourRange[$index];
			ctrl.update(hour, $index);
		};

	},
	bindings: {
		hours: '<'
	}
};
