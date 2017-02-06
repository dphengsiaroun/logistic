'use strict';

function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

var app = angular.module('lg-calendar');

var lgMonthUrl = require('./tmpl/lg-month.html');

app.component('lgMonth', {
	require: {
		lgCalendarWrapper: '^^lgCalendarWrapper'
	},
	templateUrl: lgMonthUrl,
	controller: function LgMonthCtrl($scope, $element, $locale, $compile) {
		var ctrl = this;
		// console.log('lgMonth ctrl', ctrl, arguments);
		ctrl.$onInit = function() {
			// console.log('lgMonth ctrl $onInit', ctrl);
			ctrl.printDays($element);

			ctrl.build();
		};

		ctrl.$onChanges = function(map) {
			if (map.selectedDate !== undefined) {
				ctrl.refresh();
			}
		};

		ctrl.update = function() {
			ctrl.action.apply(null, arguments);
		};

		ctrl.build = function() {
			console.log('lg-month refresh', arguments);
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
				var now = new Date();
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
					var myClass = (dayDate.getMonth() < ctrl.month) ? 'prev-month' : '';
					myClass += (dayDate.getMonth() > ctrl.month) ? ' next-month' : '';
					myClass += (k >= 5) ? ' week-end' : '';
					myClass += (ctrl.isSelected(dayDate)) ? ' selected' : '';
					var ngClick;
					if (ctrl.isForbidden(dayDate)) {
						myClass += ' disabled';
						ngClick = '';
					} else {
						ngClick = 'ng-click="$ctrl.update(' + actionArgs + ')" ';
					}
					myClass += ' ' + dayDate.getFullYear() + '-' + dayDate.getMonth() + '-' + dayOfMonth;
					html += '<td ' + ngClick + 'class="' + myClass + '">' + dayOfMonth + '</td>';
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
			selectedElt.off('click');
			selectedElt.removeClass('selected');
			$compile(selectedElt)($scope);

			if (ctrl.selectedDate === undefined) {
				return;
			}
			var myClass = ctrl.selectedDate.getFullYear() + '-' + ctrl.selectedDate.getMonth() +
				'-' + ctrl.selectedDate.getDate();
			var newSelectedElt = angular.element(elt[0].getElementsByClassName(myClass));
			newSelectedElt.addClass('selected');
			newSelectedElt.on('click', function() {
				ctrl.lgCalendarWrapper.next();
				$scope.$apply();
			});
		};


		ctrl.printDays = function($element) {
			var elt = $element.find('tr');
			var html = '';
			for (let k = 1; k < 8; k++) {
				html += '<td>' + $locale.DATETIME_FORMATS.SHORTDAY[k%7].substr(0, 2) + '</td>';
			}
			elt.html(html);
		};

	},
	bindings: {
		monthDate: '<',
		action: '<',
		selectedDate: '<'
	}
});
