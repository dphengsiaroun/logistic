(function() {
	'use strict';

	function addDays(date, days) {
		var result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	}

	var app = angular.module('lg-calendar');

	app.component('lgMonth', {
		templateUrl: 'lg-calendar/tmpl/lg-month.html',
		controller: function LgMonthCtrl($scope, $element, $locale, $compile) {
			var self = this;
			//console.log('lgMonth ctrl', this, arguments);
			this.$onInit = function() {
				//console.log('lgMonth ctrl $onInit', this);
				this.printDays($element);

				this.refresh();
			};

			this.$onChanges = function(map) {
				if (map.selectedDate !== undefined) {
					this.refresh();
				}
			};

			this.update = function() {
				this.action.apply(null, arguments);
			};

			this.refresh = function() {
				console.log('lg-month refresh', arguments);
				var date = new Date(this.monthDate);
				this.year = date.getFullYear();
				this.month = date.getMonth();
				this.monthName = $locale.DATETIME_FORMATS.MONTH[this.month];
				var firstDayDate = new Date(this.year, this.month, 1);
				var day = firstDayDate.getDay();
				if (day === 0) {
					day += 7;
				}
				var lastMonday = addDays(firstDayDate, -day + 1);
				var dayDate = lastMonday;

				this.isSelected = function(dayDate) {
					if (this.selectedDate === undefined) {
						//console.log('no selected date');
						return false;
					}
					//console.log('selected date', this.selectedDate);
					var result = dayDate.getFullYear() === this.selectedDate.getFullYear() &&
						dayDate.getMonth() === this.selectedDate.getMonth() &&
						dayDate.getDate() === this.selectedDate.getDate();
					return result;
				};

				var elt = $element.find('tbody');
				var html = '';
				for (var j = 0; j < 5; j++) {
					html += '<tr>';
					var days = [];
					for (var k = 0; k < 7; k++) {
						var myClass = (dayDate.getMonth() < this.month) ? 'prev-month' : '';
						myClass += (dayDate.getMonth() > this.month) ? ' next-month' : '';
						myClass += (k >= 5) ? ' week-end' : '';
						myClass += (this.isSelected(dayDate)) ? ' selected' : '';
						var dayOfMonth = dayDate.getDate();
						var actionArgs = this.year + ', ' + this.month + ', ' + dayOfMonth;
						html += '<td ng-click="$ctrl.update(' + actionArgs + ')" class="' + myClass + '">' + dayOfMonth + '</td>';
						dayDate = addDays(dayDate, 1);
					}
					if (j === 4 && dayDate.getMonth() === firstDayDate.getMonth()) {
						//console.log('j===4 && ', dayDate.getMonth(), firstDayDate.getMonth());
						j--;
					}
					html += '</tr>';
				}
				elt.html(html);
				$compile(elt.contents())($scope);
			};




			this.printDays = function($element) {
				var elt = $element.find('tr');
				var html = '';
				for (var k = 0; k < 7; k++) {
					html += '<td>' + $locale.DATETIME_FORMATS.SHORTDAY[k].substr(0, 2) + '</td>';
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


})();
