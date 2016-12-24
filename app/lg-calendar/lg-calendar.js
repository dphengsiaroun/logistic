(function() {
	'use strict';

	var app = angular.module('lg-calendar', ['lg-misc']);

	app.directive('input', ['$injector', function($injector) {
		var $compile = $injector.get('$compile');
		return {
			restrict: 'E',
			require: '?ngModel',
			link: function (scope, element, attr, ctrl) {
				if (attr.type !== 'lgDate') {
					return;
				}
				var title = attr.title || attr.placeholder;
				var elt = angular.element('<!-- input type="lgDate" ng-model="' + attr.ngModel + '" -->' +
					'<lg-calendar-wrapper ' +
					'placeholder="\'' + attr.placeholder + '\'" ' +
					'title="\'' + title + '\'" ' +
					'options="' + attr.options + '" ' +
					'ng-model="' + attr.ngModel + '" ' +
					'></lg-calendar-wrapper>');
				element.after(elt);

				element.attr('style', 'display: none !important');
				$compile(elt)(scope);
			}
		};

	}]);

	app.component('lgCalendarWrapper', {
		require: {
			ngModel: 'ngModel',
		},
		templateUrl: 'lg-calendar/tmpl/lg-calendar-wrapper.html',
		controller: ['$scope', '$element', '$injector', function lgCalendarWrapperCtrl($scope, $element, $injector) {
			var lgScroll = $injector.get('lgScroll');
			var $locale = $injector.get('$locale');
			var $filter = $injector.get('$filter');
			var self = this;
			var ngModelCtrl;
			this.format = 'EEEE dd LLLL - HH:mm';

			this.state = 'outsideState';

			this.myOptions = {
				position: 'now',
				monthNbr: 6,
				constraint: {},
				lgHour: 1,
				defaultHour: 6
			};

			this.start = function() {
				this.state = 'dateState';
				lgScroll.save();
				this.compute();
			};

			this.stop = function() {
				this.state = 'outsideState';
				lgScroll.restore();
			};

			this.update = function(date) {
				self.selectedDate = date;
				ngModelCtrl.$setViewValue(date);
				ngModelCtrl.$render();
				ngModelCtrl.$setTouched();
			};

			this.cancel = function() {
				self.update(undefined);
				self.stop();
			};

			this.next = function() {
				console.log('next', arguments);
				console.log('next', self);
				if (self.state === 'dateState') {
					if (self.ngModel.$viewValue === undefined) {
						return;
					}
					self.state = 'hourState';
				} else if (self.state === 'hourState') {
					if (self.ngModel.$viewValue === undefined) {
						return;
					}
					self.state = 'outsideState';
				}
			};

			this.back = function() {
				console.log('back', arguments);
				console.log('back', self);
				if (self.state === 'hourState') {
					self.state = 'dateState';
				}
			};

			this.compute = function() {
				console.log('compute');
				this.myOptions.start = new Date();
				if (this.myOptions.position === 'now') {
					this.myOptions.start = new Date();
				}
				this.months = [];
				for (var i = 0; i < this.myOptions.monthNbr; i++) {
					var date = new Date(this.myOptions.start);
					date.setMonth(date.getMonth() + i);
					this.months.push(date);
					//console.log('this.months', this.months);
				}

			};

			this.setDate = function(year, month, day) {
				console.log('setDate', arguments);
				console.log('year', year);
				var date = new Date(year, month, day, self.myOptions.defaultHour);
				console.log('date', date);
				self.update(date);
				self.selectedHours = date.getHours();
			};

			this.setHours = function(hour) {
				console.log('setHours', arguments);
				var date = ngModelCtrl.$viewValue;
				date.setHours(hour);
				self.selectedHours = date.getHours();
				console.log('ngModelCtrl.$setViewValue', ngModelCtrl.$viewValue);
				ngModelCtrl.$render();
				ngModelCtrl.$setTouched();
			};



			this.$onInit = function() {
				console.log('lgCalendarWrapper ctrl $onInit', this);
				console.log('this.ngModel', this.ngModel);
				ngModelCtrl = this.ngModel;

				console.log('options', this.options);
				angular.extend(this.myOptions, this.options);

				ngModelCtrl.$render = function() {
					console.log('ngModelCtrl.$render', arguments);

					var datetime = undefined;
					if (ngModelCtrl.$viewValue !== undefined) {
						datetime = $filter('date')(ngModelCtrl.$viewValue, self.format);
					}
					var html = datetime || self.placeholder;
					var elt = $element.find('my-input');
					if (datetime !== undefined) {
						console.log('filled');
						elt.addClass('filled');
					} else {
						console.log('not filled');
						elt.removeClass('filled');

					}
					elt.html(html);
					checkValidity(1);
				};

				var checkValidity = function(value) {
					var isOutOfChoice = false;
					ngModelCtrl.$setValidity('outOfChoice', isOutOfChoice);
				};
			};

		}],
		bindings: {
			title: '<',
			choices: '<',
			placeholder: '<',
			isMandatory: '<',
			options: '<'
		}
	});


})();
