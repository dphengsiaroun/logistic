require('./lg-hour3.scss');

const app = angular.module('lg-calendar');

const lgHourUrl = require('./tmpl/lg-hour3.html');

app.component('lgHour3', {
	require: {
		lgCalendarWrapper: '^^lgCalendarWrapper'
	},
	templateUrl: lgHourUrl,
	controller: function LgMonthCtrl($scope, $element, $locale, $compile) {
		const self = this;
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
			const selectedElt = angular.element($element[0].getElementsByClassName('selected'));
			selectedElt.removeClass('selected');
			if (this.selectedHours === undefined) {
				return;
			}
			let hour = this.selectedHours % 12;
			if (hour === 0) {
				hour = 12;
			}
			const ampm = (this.selectedHours > 12 || this.selectedHours === 0) ? 'pm' : 'am';
			const myClass = 'h' + hour + ' ' + ampm;
			const newSelectedElt = angular.element($element[0].getElementsByClassName(myClass));
			newSelectedElt.addClass('selected');
		};

	},
	bindings: {
		action: '<',
		selectedHours: '<'
	}
});

