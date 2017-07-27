function addDays(date, days) {
	const result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

function getDays(date) {
	const d = new Date(date);
	d.setHours(12);
	return Math.floor(d / 8.64e7);
}

const app = angular.module('lg-datetime');

const lgDtMonthUrl = require('./tmpl/lg-dt-month.html');

app.component('lgDtMonth', {
	require: {
		lgDatetime: '^^lgDatetime'
	},
	template: lgDtMonthUrl,
	controller: function LgDtMonthCtrl($scope, $element, $locale, $compile) {
		const ctrl = this;
		console.log('lgMonth ctrl', ctrl, arguments);
		ctrl.$onInit = function() {
			console.log('lgMonth ctrl $onInit', ctrl);
			ctrl.printDays($element);

			ctrl.build();
			ctrl.refresh();
		};

		ctrl.$onChanges = function(changesObj) {
			if (changesObj.selectedDate !== undefined) {
				ctrl.refresh();
			}
		};

		ctrl.update = function() {
			ctrl.action.apply(null, arguments);
		};

		ctrl.build = function() {
			console.log('lg-month build', arguments);
			const date = new Date(ctrl.monthDate);
			ctrl.year = date.getFullYear();
			ctrl.month = date.getMonth();
			ctrl.monthName = $locale.DATETIME_FORMATS.MONTH[ctrl.month];
			const firstDayDate = new Date(ctrl.year, ctrl.month, 1);
			let day = firstDayDate.getDay();
			if (day === 0) {
				day += 7;
			}
			const lastMonday = addDays(firstDayDate, -day + 1);
			let dayDate = lastMonday;

			ctrl.isSelected = function(d) {
				if (ctrl.selectedDate === undefined) {
					// console.log('no selected date');
					return false;
				}
				// console.log('selected date', ctrl.selectedDate);
				const result = d.getFullYear() === ctrl.selectedDate.getFullYear() &&
					d.getMonth() === ctrl.selectedDate.getMonth() &&
					d.getDate() === ctrl.selectedDate.getDate();
				return result;
			};

			ctrl.isForbidden = function(d) {
				const now = ctrl.lgDatetime.opts.start;
				const nowAtMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
				if (d <= nowAtMidnight) {
					return true;
				}
				return false;
			};

			const elt = $element.find('tbody');
			let html = '';
			for (let j = 0; j < 5; j++) {
				html += '<tr>';
				for (let k = 0; k < 7; k++) {
					const dayOfMonth = dayDate.getDate();
					const actionArgs = dayDate.getFullYear() + ', ' + dayDate.getMonth() + ', ' + dayOfMonth;
					let myClass = '';
					let ngClick = '';

					if (ctrl.isForbidden(dayDate)) {
						myClass += ' disabled';
					} else {
						ngClick = 'ng-click="$ctrl.update(' + actionArgs + ')" ';
					}
					myClass += (k >= 5) ? ' week-end' : '';
					myClass += (ctrl.isSelected(dayDate)) ? ' selected' : '';
					myClass += ' d' + getDays(dayDate);

					if (dayDate.getMonth() !== ctrl.month) {
						ngClick = '';
						myClass = ' other-month';
					}

					html += '<td ' + ngClick + 'class="' + myClass + '"><span>' + dayOfMonth + '</span></td>';
					dayDate = addDays(dayDate, 1);
				}
				if (j === 4 && dayDate.getMonth() === firstDayDate.getMonth()) {
					// console.log('j===4 && ', dayDate.getMonth(), firstDayDate.getMonth());
					j--;
				}
				html += '</tr>';
			}
			elt.html(html);
			$compile(elt.contents())($scope);
		};

		ctrl.refresh = function() {
			// ctrl part needs a real jquery
			const elt = $element.find('tbody');
			const selectedElt = angular.element(elt[0].getElementsByClassName('selected'));
			selectedElt.removeClass('selected');

			if (ctrl.selectedDate === undefined) {
				return;
			}
			const myClass = 'd' + getDays(ctrl.selectedDate);
			const newSelectedElt = angular.element(elt[0].getElementsByClassName(myClass));
			newSelectedElt.addClass('selected');

			if (ctrl.lgDatetime.opts.after) {
				ctrl.refreshInterval();
			}
		};


		ctrl.printDays = function($element) {
			const elt = $element.find('tr');
			let html = '';
			for (let k = 1; k < 8; k++) {
				html += '<td>' + $locale.DATETIME_FORMATS.SHORTDAY[k % 7].substr(0, 2) + '</td>';
			}
			elt.html(html);
		};

		ctrl.refreshInterval = function() {
			const elt = $element.find('tbody');
			let e = angular.element(elt[0].getElementsByClassName('interval'));
			e.removeClass('interval');
			e = angular.element(elt[0].getElementsByClassName('interval-start'));
			e.removeClass('interval-start');

			if (ctrl.selectedDate === undefined) {
				return;
			}
			const start = getDays(ctrl.lgDatetime.opts.start);
			const end = getDays(ctrl.selectedDate);
			for (let i = start; i <= end; i++) {
				const myClass = 'd' + i;
				const dayElt = angular.element(elt[0].getElementsByClassName(myClass));
				if (i === start) {
					dayElt.addClass('interval-start');
				} else {
					dayElt.addClass('interval');
				}
			}
		};
	},
	bindings: {
		monthDate: '=',
		action: '<',
		selectedDate: '<'
	}
});
