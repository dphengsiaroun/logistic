'use strict';

function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

function getDays(date) {
	var d = new Date(date);
	d.setHours(12);
	return Math.floor(d / 8.64e7);
};

var app = angular.module('lg-datetime');

var lgDtMonthUrl = require('./tmpl/lg-dt-month.html');

app.component('lgDtMonth', {
	require: {
		lgDatetime: '^^lgDatetime'
	},
	templateUrl: lgDtMonthUrl,
	controller: function LgDtMonthCtrl($scope, $element, $locale, $compile) {
		var ctrl = this;
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
			var date = new Date(ctrl.monthDate);
			ctrl.year = date.getFullYear();
			ctrl.month = date.getMonth();
			ctrl.monthName = $locale.DATETIME_FORMATS.MONTH[ctrl.month];
			var firstDayDate = new Date(ctrl.year, ctrl.month, 1);
			var day = firstDayDate.getDay();
			if (day === 0) {
				day += 7;
			}
			var lastMonday = addDays(firstDayDate, -day + 1);
			var dayDate = lastMonday;

			ctrl.isSelected = function(d) {
				if (ctrl.selectedDate === undefined) {
					// console.log('no selected date');
					return false;
				}
				// console.log('selected date', ctrl.selectedDate);
				var result = d.getFullYear() === ctrl.selectedDate.getFullYear() &&
					d.getMonth() === ctrl.selectedDate.getMonth() &&
					d.getDate() === ctrl.selectedDate.getDate();
				return result;
			};

			ctrl.isForbidden = function(d) {
				var now = ctrl.lgDatetime.opts.start;
				var nowAtMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
				if (d <= nowAtMidnight) {
					return true;
				}
				return false;
			};

			var elt = $element.find('tbody');
			var html = '';
			for (let j = 0; j < 5; j++) {
				html += '<tr>';
				for (let k = 0; k < 7; k++) {
					var dayOfMonth = dayDate.getDate();
					var actionArgs = dayDate.getFullYear() + ', ' + dayDate.getMonth() + ', ' + dayOfMonth;
					var myClass = '';
					var ngClick = '';

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
			var elt = $element.find('tbody');
			var selectedElt = angular.element(elt[0].getElementsByClassName('selected'));
			selectedElt.removeClass('selected');

			if (ctrl.selectedDate === undefined) {
				return;
			}
			var myClass = 'd' + getDays(ctrl.selectedDate);
			var newSelectedElt = angular.element(elt[0].getElementsByClassName(myClass));
			newSelectedElt.addClass('selected');

			if (ctrl.lgDatetime.opts.after) {
				ctrl.refreshInterval();
			}
		};


		ctrl.printDays = function($element) {
			var elt = $element.find('tr');
			var html = '';
			for (let k = 1; k < 8; k++) {
				html += '<td>' + $locale.DATETIME_FORMATS.SHORTDAY[k % 7].substr(0, 2) + '</td>';
			}
			elt.html(html);
		};

		ctrl.refreshInterval = function() {
			var elt = $element.find('tbody');
			var e = angular.element(elt[0].getElementsByClassName('interval'));
			e.removeClass('interval');
			e = angular.element(elt[0].getElementsByClassName('interval-start'));
			e.removeClass('interval-start');

			if (ctrl.selectedDate === undefined) {
				return;
			}
			var start = getDays(ctrl.lgDatetime.opts.start);
			var end = getDays(ctrl.selectedDate);
			for (let i = start; i <= end; i++) {
				var myClass = 'd' + i;
				var dayElt = angular.element(elt[0].getElementsByClassName(myClass));
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
