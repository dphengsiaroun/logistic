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
		controller: function LgChoiceWrapperCtrl($locale, $element, $compile) {
			var self = this;
			//console.log('lgMonth ctrl', this, arguments);
			this.$onInit = function() {
				//console.log('lgMonth ctrl $onInit', this);
				var date = new Date(this.date);
				this.year = date.getFullYear();
				this.month = date.getMonth();
				var monthName = $locale.DATETIME_FORMATS.MONTH[this.month];
				var firstDayDate = new Date(this.year, this.month, 1);
				var day = firstDayDate.getDay();
				if (day === 0) {
					day += 7;
				}
				var lastMonday = addDays(firstDayDate, -day + 1);
				var dayDate = lastMonday;

				var elt = $element.find('tbody');
				var html = '';
				for (var j = 0; j < 5; j++) {
					html += '<tr>';
					var days = [];
					for (var k = 0; k < 7; k++) {
						var myClass = (dayDate.getMonth() < this.month) ? 'prev-month' : '';
						myClass += (dayDate.getMonth() > this.month) ? ' next-month' : '';
						myClass += (k >= 5) ? ' week-end' : '';
						html += '<td class="' + myClass + '">' + dayDate.getDate() + '</td>';
						dayDate = addDays(dayDate, 1);
					}
					if (j === 4 && dayDate.getMonth() === firstDayDate.getMonth()) {
						//console.log('j===4 && ', dayDate.getMonth(), firstDayDate.getMonth());
						j--;
					}
					html += '</tr>';
				}
				elt.html(html);

			};

		},
		bindings: {
			date: '<',
		}
	});


})();
