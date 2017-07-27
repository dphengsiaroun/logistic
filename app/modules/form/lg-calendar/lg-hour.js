require('./lg-hour.scss');

const app = angular.module('lg-calendar');

const lgHourUrl = require('./tmpl/lg-hour.html');
let id = 0;

app.component('lgHour', {
	require: {
		lgCalendarWrapper: '^^lgCalendarWrapper'
	},
	templateUrl: lgHourUrl,
	controller: function LgMonthCtrl($scope, $element, $locale, $compile) {
		const self = this;
		id++;
		this.id = id;
		// console.log('lgMonth ctrl', this, arguments);
		this.$onInit = function() {
			console.log('lgHour ctrl $onInit', this);
			this.refreshStyle();
		};

		this.$onChanges = function(map) {
			if (map.selectedHours !== undefined) {
				this.refresh();
			}
		};

		$scope.$watchGroup(['$ctrl.radius', '$ctrl.x', '$ctrl.y'], function() {
			self.refreshStyle();
		});

		this.radius = 110;
		this.x = 107;
		this.y = 109;

		this.refreshStyle = function() {
			this.style = '';

			for (let i = 1; i <= 12; i++) {
				const top = this.y - this.radius*Math.cos(i*6.28/12);
				const left = this.x + this.radius*Math.sin(i*6.28/12);
				this.style += '.id-' + this.id + '.hour-' + i + ' { top: ' + top + 'px; left: ' + left + 'px;}\n';
			}
		};

		this.formatHour = function() {
			const hour = this.selectedHours < 10 ? '0'+this.selectedHours : this.selectedHours;
			return hour + ':00';
		};

		this.compute24Hour = function(hour) {
			let h = hour;
			if (this.isAm === false) {
				if (h === 12) {
					h = 0;
				} else {
					h += 12;
				}
			}
			return h;
		};

		this.isAm = true;

		this.setAmPm = function(isAm) {
			this.isAm = isAm;
			const hour = this.selectedHours % 12;
			const h = this.compute24Hour(hour);
			console.log('h', h);
			this.action.apply(null, [h]);
			this.refresh();
		};

		this.update = function(hour) {
			const h = this.compute24Hour(hour);
			console.log('h', h);
			this.action.apply(null, [h]);
			this.refresh();
			if (this.selectedHours === h) {
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
			const myClass = 'hour-' + hour + ' ' + ampm;
			const newSelectedElt = angular.element($element[0].getElementsByClassName(myClass));
			newSelectedElt.addClass('selected');
		};

	},
	bindings: {
		action: '<',
		selectedHours: '<'
	}
});

