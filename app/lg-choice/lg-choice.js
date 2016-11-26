(function() {
	'use strict';

	var app = angular.module('lg-choice', []);

	app.directive('input', ['$injector', function($injector) {
		var $compile = $injector.get('$compile');
		return {
			restrict: 'E',
			scope: {},
			require: 'ngModel',
			link: function (scope, element, attr, ctrl) {
				if (attr.type !== 'choice') {
					return;
				}
				console.log('input type="choice"', arguments);
				var elt = angular.element('<!-- input type="choice" ng-model="' + attr.ngModel + '" -->'
				+ '<div class="lg-choice" ng-click="start();"></div>');
				element.after(elt);
				element.attr('style', 'display: none !important');
				$compile(elt)(scope);

				ctrl.$render = function() {
					console.log('ctrl', ctrl);
					var choice = (ctrl.$viewValue === '') ? undefined : ctrl.$viewValue;

					var html = choice || attr.placeholder;
					if (choice !== undefined) {
						elt.addClass('filled');
					} else {
						elt.removeClass('filled');
					}
					console.log('html', html);
					elt.html(html);
					// var linkingFn = $compile(elt.contents()); // compare this line with the next one...
					
					checkValidity(1);
				};

				scope.start = function() {
					console.log('start', arguments, attr);
					scope.elt = angular.element('<lg-choice update="update" placeholder="\'' + attr.placeholder + '\'" choices="' + attr.choices + '" title="' + attr.title + '"></lg-choice>');
					element.after(scope.elt);
					$compile(scope.elt)(scope);
				};

				scope.stop = function() {
					console.log('stop', arguments);
					console.log('scope.elt', scope.elt);
					scope.elt.remove();
					scope.elt = undefined;
				};

				scope.update = function(choice) {
					console.log('input choice update', arguments);
					scope.stop();
					
					ctrl.$setViewValue(choice);
					ctrl.$render();
					// because we have no blur event, then we must set the touched ourselves.
					ctrl.$setTouched();
				};

				var checkValidity = function(value) {
					var isOutOfChoice = true;
					ctrl.$setValidity('outOfChoice', isOutOfChoice);
				};


			}
		};

	}]);

	app.component('lgChoice', {
		templateUrl: 'lg-choice/tmpl/lg-choice.html',
		controller: function() {
			console.log('lgChoice controller', arguments, this);
			this.$onInit = function() {
				console.log('lgChoice controller onInit', arguments, this);
			};

		},
		bindings: {
			title: '=',
			choices: '=',
			update: '=',
			placeholder: '=',
		}
	});

	

})();
