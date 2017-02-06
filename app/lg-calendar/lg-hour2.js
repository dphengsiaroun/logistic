'use strict';

require('./lg-hour2.scss');

var app = angular.module('lg-calendar');
var id = 0;

var lgHour2Url = require('./tmpl/lg-hour2.html');

app.component('lgHour2', {
	require: {
		lgCalendarWrapper: '^^lgCalendarWrapper'
	},
	templateUrl: lgHour2Url,
	controller: function LgMonth2Ctrl($scope, $element, $locale, $compile) {
		'ngInject';
		var self = this;
		id++;
		this.id = id;

		this.getRange = function(start, stop) {
			var result = [];
			for (let i = start; i <= stop; i++) {
				result.push(i);
			}
			return result;
		};

		this.x = 108;
		this.y = 109;
		this.radius = 147;

		this.$onInit = function() {
			console.log('lgHour2 ctrl $onInit', this);
			this.refreshStyle();
		};

		this.refreshStyle = function() {
			this.style = '';
			console.log('xxxxxxxxxxxxxx');
			for (let i = 0; i < 24; i++) {
				var top = this.y + this.radius*Math.cos(i*6.28/24);
				var left = this.x - this.radius*Math.sin(i*6.28/24);
				this.style += '.i-' + this.id + '.h-' + i + ' { top: ' + top + 'px; left: ' + left + 'px;}\n';
			}
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
			var myClass = 'h-' + this.selectedHours;
			var newSelectedElt = angular.element($element[0].getElementsByClassName(myClass));
			newSelectedElt.addClass('selected');
		};

	},
	bindings: {
		action: '<',
		selectedHours: '<',
	}
});
