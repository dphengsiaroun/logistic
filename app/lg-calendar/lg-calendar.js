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
		controller: ['$scope', '$element', '$injector', function LgChoiceWrapperCtrl($scope, $element, $injector) {
			var lgSequence = $injector.get('lgSequence');
			var lgScroll = $injector.get('lgScroll');
			var $locale = $injector.get('$locale');
			var self = this;

			this.myOptions = {
				position: 'now',
				monthNbr: 6,
				constraint: {}
			};

			this.style = '';
			this.id = lgSequence.next();

			this.start = function() {
				lgScroll.save();
				this.compute();
				this.style = '#lgCalendar' + this.id + ' {display: block;}';
				//console.log('choice ctrl', this);
			};

			this.stop = function() {
				lgScroll.restore();
				this.style = '#lgCalendar' + this.id + ' {display: none;}';
			};

			this.update = function(choice) {
				this.stop();

				this.ngModel.$setViewValue(choice);
				this.ngModel.$render();
				// because we have no blur event, then we must set the touched ourselves.
				this.ngModel.$setTouched();
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



			this.$onInit = function() {
				console.log('lgCalendarWrapper ctrl $onInit', this);
				var ngModelctrl = this.ngModel;

				console.log('options', this.options);
				angular.extend(this.myOptions, this.options);




				ngModelctrl.$render = function() {
					console.log('ngModelctrl.$render', arguments);


					var choice = (ngModelctrl.$viewValue === '') ? undefined : ngModelctrl.$viewValue;
					var html = choice || self.placeholder;
					var elt = $element.find('my-input');
					if (choice !== undefined) {
						console.log('filled');
						elt.addClass('filled');
					} else {
						console.log('not filled');
						elt.removeClass('filled');

					}
					elt.html(html);
					// var linkingFn = $compile(elt.contents()); // compare this line with the next one...

					checkValidity(1);
				};
				console.log('this.ngModel', this.ngModel);


				var checkValidity = function(value) {
					var isOutOfChoice = false;
					ngModelctrl.$setValidity('outOfChoice', isOutOfChoice);
				};

				this.myFilter = function(value, index, array) {

					if (self.ngModel.$modelValue !== undefined && self.ngModel.$modelValue === value) {
						return false;
					}
					if (self.myInput === undefined) {
						return true;
					}

					if (removeDiacritic(value.toLowerCase()).indexOf(removeDiacritic(self.myInput.toLowerCase())) !== -1) {
						return true;
					}
					return false;
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
