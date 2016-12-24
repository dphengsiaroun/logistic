(function() {
	'use strict';

	var app = angular.module('lg-calendar');

	app.component('lgHour', {
		require: {
			lgCalendarWrapper: '^^lgCalendarWrapper'
		},
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
				var selectedElt = angular.element($element[0].getElementsByClassName('selected'));
				selectedElt.removeClass('selected');
				selectedElt.off('click');
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
				newSelectedElt.on('click', function() {
					self.lgCalendarWrapper.next();
					$scope.$apply();
				});
			};

		},
		bindings: {
			action: '<',
			selectedHours: '<'
		}
	});


})();
