'use strict';

require('./lg-hour3.css');

var app = angular.module('lg-calendar');

var lgHourUrl = require('./tmpl/lg-hour3.html');

app.component('lgHour3', {
	require: {
		lgCalendarWrapper: '^^lgCalendarWrapper'
	},
	templateUrl: lgHourUrl,
	controller: function LgMonthCtrl($scope, $element, $locale, $compile) {
		var self = this;
		// console.log('lgMonth ctrl', this, arguments);
		this.$onInit = function() {
			console.log('lgHour3 ctrl $onInit', this);
		};

		this.$onChanges = function(map) {
			if (map.selectedHours !== undefined) {
				this.refresh();
			}
		};

		this.update = function(hour) {

			this.action.apply(null, arguments);
			this.refresh();
			if (this.selectedHours === hour) {
				self.lgCalendarWrapper.next();
			}
		};

		this.refresh = function() {
			var selectedElt = angular.element($element[0].getElementsByClassName('selected'));
			selectedElt.removeClass('selected');
			if (this.selectedHours === undefined) {
				return;
			}
			var hour = this.selectedHours % 12;
			if (hour === 0) {
				hour = 12;
			}
			var ampm = (this.selectedHours > 12 || this.selectedHours === 0) ? 'pm' : 'am';
			var myClass = 'h' + hour + ' ' + ampm;
			var newSelectedElt = angular.element($element[0].getElementsByClassName(myClass));
			newSelectedElt.addClass('selected');
		};

	},
	bindings: {
		action: '<',
		selectedHours: '<'
	}
});

