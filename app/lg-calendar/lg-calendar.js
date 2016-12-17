(function() {
	'use strict';

	var app = angular.module('lg-calendar', []);

	app.directive('input', ['$injector', function($injector) {
		var $compile = $injector.get('$compile');
		return {
			restrict: 'E',
			require: '?ngModel',
			link: function (scope, element, attr, ctrl) {
				if (attr.type !== 'lgDate') {
					return;
				}
				var elt = angular.element('<!-- input type="lgDate" ng-model="' + attr.ngModel + '" -->' +
					'<lg-calendar-wrapper ' +
					'title="\'' + attr.placeholder + '\'" ' +
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
			var lgChoiceSequence = $injector.get('lgChoiceSequence');
			var lgChoiceScroll = $injector.get('lgChoiceScroll');
			var self = this;

			this.style = '';
			this.id = lgChoiceSequence.next();
			
			this.start = function() {
				lgChoiceScroll.save();
				this.style = '#lgChoice' + this.id + ' {display: block;}';
				console.log('choice ctrl', this);
			};

			this.stop = function() {
				lgChoiceScroll.restore();
				this.style = '#lgChoice' + this.id + ' {display: none;}';
			};

			this.update = function(choice) {
				this.stop();
				
				this.ngModel.$setViewValue(choice);
				this.ngModel.$render();
				// because we have no blur event, then we must set the touched ourselves.
				this.ngModel.$setTouched();
			};

			

			this.$onInit = function() {
				var ctrl = this.ngModel;
				
				ctrl.$render = function() {
					var choice = (ctrl.$viewValue === '') ? undefined : ctrl.$viewValue;
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
					ctrl.$setValidity('outOfChoice', isOutOfChoice);
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
		}
	});
	

})();
