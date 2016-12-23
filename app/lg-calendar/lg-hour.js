(function() {
	'use strict';

	var app = angular.module('lg-calendar');

	app.component('lgHour', {
		templateUrl: 'lg-calendar/tmpl/lg-hour.html',
		controller: function LgMonthCtrl($scope, $element, $locale, $compile) {
			var self = this;
			//console.log('lgMonth ctrl', this, arguments);
			this.$onInit = function() {
				console.log('lgHour ctrl $onInit', this);
			};

			this.$onChanges = function(map) {
				if (map.selectedHours !== undefined) {
					this.refresh();
				}
			};

			this.update = function(hour) {

				this.action.apply(null, arguments);
				this.refresh();
			};

			this.refresh = function() {
				angular.element($element[0].getElementsByClassName('selected')).removeClass('selected');
				if (this.selectedHours === undefined) {
					return;
				}
				var hour = this.selectedHours % 12;
				var ampm = (this.selectedHours >= 12) ? 'pm' : 'am';
				var myClass = 'h' + hour + ' ' + ampm;
				angular.element($element[0].getElementsByClassName(myClass)).addClass('selected');
			};

		},
		bindings: {
			action: '<',
			selectedHours: '<'
		}
	});


})();
