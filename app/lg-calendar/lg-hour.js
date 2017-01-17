'use strict';

require('./lg-hour.scss');

var app = angular.module('lg-calendar');

var lgHourUrl = require('./tmpl/lg-hour.html');
var id = 0;

app.component('lgHour', {
	require: {
		lgCalendarWrapper: '^^lgCalendarWrapper'
	},
	templateUrl: lgHourUrl,
	controller: function LgMonthCtrl($scope, $element, $locale, $compile) {
		var self = this;
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

			for (var i = 1; i <= 12; i++) {
				var top = this.y - this.radius*Math.cos(i*6.28/12);
				var left = this.x + this.radius*Math.sin(i*6.28/12);
				this.style += '.id-' + this.id + '.hour-' + i + ' { top: ' + top + 'px; left: ' + left + 'px;}\n';
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
			var myClass = 'hour-' + hour + ' ' + ampm;
			var newSelectedElt = angular.element($element[0].getElementsByClassName(myClass));
			newSelectedElt.addClass('selected');
		};

	},
	bindings: {
		action: '<',
		selectedHours: '<'
	}
});

