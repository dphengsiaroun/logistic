(function() {
	'use strict';

	var app = angular.module('lg-calendar');
	var id = 0;

	app.component('lgHour2', {
		templateUrl: 'lg-calendar/tmpl/lg-hour2.html',
		controller: function LgMonth2Ctrl($scope, $element, $locale, $compile) {
			var self = this;
			id++;
			this.id = id;

			this.getRange = function(start, stop) {
				var result = [];
				for (var i = start; i <= stop; i++) {
					result.push(i);
				}
				return result;
			};

			this.x = 108;
			this.y = 109;
			this.radius = 147;

			this.$onInit = function() {
				console.log('lgHour ctrl $onInit', this);
				this.refreshStyle();
			};

			this.refreshStyle = function() {
				this.style = '';

				for (var i = 0; i < 24; i++) {
					var top = this.y + this.radius*Math.cos(i*6.28/24);
					var left = this.x - this.radius*Math.sin(i*6.28/24);
					this.style += '.i-' + this.id + '.h-' + i + ' { top: ' + top + 'px; left: ' + left + 'px;}\n';
				}
			};

			$scope.$watch('$ctrl', function() {
				console.log('watch radius', arguments);
				self.refreshStyle();
			}, true);

			this.$onChanges = function(map) {
				if (map.selectedHours !== undefined) {
					this.refresh();
				}
			};

			this.update = function(hour) {
				this.selectedHours = hour;
				this.action.apply(null, arguments);
				this.refresh();
			};

			this.refresh = function() {
				angular.element($element[0].getElementsByClassName('selected')).removeClass('selected');
				if (this.selectedHours === undefined) {
					return;
				}
				var myClass = 'h-' + this.selectedHours;
				angular.element($element[0].getElementsByClassName(myClass)).addClass('selected');
			};

		},
		bindings: {
			action: '<',
			selectedHours: '<',
		}
	});


})();
