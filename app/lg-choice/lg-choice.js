(function() {
	'use strict';

	var app = angular.module('lg-choice', []);

	app.directive('input', ['$injector', function($injector) {
		var $compile = $injector.get('$compile');
		return {
			restrict: 'E',
			require: 'ngModel',
			link: function (scope, element, attr, ctrl) {
				if (attr.type !== 'choice') {
					return;
				}
				var elt = angular.element('<!-- input type="choice" ng-model="' + attr.ngModel + '" -->' +
					'<lg-choice-wrapper ' +
					'placeholder="\'' + attr.placeholder + '\'" ' +
					'choices="' + attr.choices + '" ' +
					'title="\'' + attr.title + '\'" ' +
					'ng-model="' + attr.ngModel + '" ' +
					'></lg-choice-wrapper>');
				element.after(elt);
				element.attr('style', 'display: none !important');
				$compile(elt)(scope);

			}
		};

	}]);

	app.service('lgChoiceSequence', function LgChoiceSequence() {
		this.current = 0;
		this.next = function() {
			this.current++;
			return this.current;
		};
	});

	app.component('lgChoiceWrapper', {
		require: {
			ngModel: 'ngModel',
		},
		templateUrl: 'lg-choice/tmpl/lg-choice-wrapper.html',
		controller: ['$scope', '$element', '$injector', function($scope, $element, $injector) {
			var lgChoiceSequence = $injector.get('lgChoiceSequence');
			var $location = $injector.get('$location');
			var $anchorScroll = $injector.get('$anchorScroll');

			this.style = '';
			this.id = lgChoiceSequence.next();
			
			this.start = function() {
				this.style = '#lgChoice' + this.id + ' {display: block;}';
			};

			this.stop = function() {
				this.style = '#lgChoice' + this.id + ' {display: none;}';
			};

			this.update = function(choice) {
				this.stop();
				
				this.ngModel.$setViewValue(choice);
				this.ngModel.$render();
				// because we have no blur event, then we must set the touched ourselves.
				this.ngModel.$setTouched();

				$location.hash('lgChoiceInput' + this.id);
				$anchorScroll();
			};

			

			this.$onInit = function() {
				var ctrl = this.ngModel;
				ctrl.$render = function() {
					var choice = (ctrl.$viewValue === '') ? undefined : ctrl.$viewValue;
					var html = choice || this.placeholder;
					var elt = $element.find('my-input');
					if (choice !== undefined) {
						elt.addClass('filled');
					} else {
						elt.removeClass('filled');
					}
					elt.html(html);
					// var linkingFn = $compile(elt.contents()); // compare this line with the next one...
					
					checkValidity(1);
				};

				var checkValidity = function(value) {
					var isOutOfChoice = true;
					ctrl.$setValidity('outOfChoice', isOutOfChoice);
				};
			};

			
		}],
		bindings: {
			title: '=',
			choices: '=',
			placeholder: '=',
		}
	});
	

})();
