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

				ctrl.$render = function() {
					console.log('ctrl', ctrl);
					var html = attr.placeholder;
					console.log('html', html);
					elt.html(html);
					// var linkingFn = $compile(elt.contents()); // compare this line with the next one...
					$compile(elt)(scope);
					checkValidity(1);
				};

				scope.start = function() {
					console.log('start', arguments);
					var elt = angular.element('<div ng-include="\'tmpl/address-autocomplete.html\'"></div>');
					element.after(elt);
					$compile(elt)(scope);

				};

				scope.update = function(note) {
					ctrl.$setViewValue(note);
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

	

})();
