(function() {
	'use strict';

	var app = angular.module('lg-num', []);

	app.directive('input', ['$injector', function($injector) {
		var $compile = $injector.get('$compile');
		return {
			restrict: 'E',
			require: '?ngModel',
			link: function (scope, element, attr, ctrl) {
				if (attr.type !== 'num') {
					return;
				}
				console.log('input type="num"', arguments);
				
				var elt = angular.element('<!-- input type="num" ng-model="' + attr.ngModel + '" -->' +
					'<lg-num ng-model="' + attr.ngModel + 
					'" options="' + attr.options + 
					'" placeholder="\'' + attr.placeholder + '\'"></lg-num>');
				element.after(elt);
				element.attr('style', 'display: none !important');
				$compile(elt)(scope);
				
			}
		};

	}]);

	app.component('lgNum', { 
		require: {
			ngModel: 'ngModel'
		},
		templateUrl: 'lg-num/tmpl/lg-num.html',
		controller: function($element, $filter) {
			'ngInject';
			console.log('lgNum controller', arguments, this);
			console.log('lgNum controller', arguments, this.ngModel);
			var ctrl = this;
			var ngModelCtrl;
			var elt = $element.find('my-input');
			
			this.myOptions = {
				format: 3,
				step: 1
			};

			this.$onInit = function() {
				console.log('lgNum controller onInit', arguments, this);
				console.log('lgNum controller onInit', arguments, this.ngModel);
				ngModelCtrl = this.ngModel;
				angular.extend(this.myOptions, this.options);
				console.log('this.myOptions', this.myOptions);
				console.log('this.options', this.options);

				ngModelCtrl.$render = function() {
					console.log('ngModelCtrl.$render', arguments, this);
					var valueStr = ctrl.placeholder;
					if (ngModelCtrl.$viewValue !== undefined) {
						valueStr = $filter('number')(ngModelCtrl.$viewValue, ctrl.myOptions.format);
						elt.addClass('filled');
					} else {
						elt.removeClass('filled');
					}
				
					elt.html(valueStr);
				};
			};
			this.plus = function() {
				console.log('lgNum plus', arguments, this);
				if (ngModelCtrl.$viewValue === undefined) {
					ngModelCtrl.$viewValue = 0;
				}
				ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue + ctrl.myOptions.step);
				ngModelCtrl.$render();
				ngModelCtrl.$setTouched();
			};
			this.minus = function() {
				console.log('lgNum minus', arguments, this);
				if (ngModelCtrl.$viewValue === undefined) {
					ngModelCtrl.$viewValue = 0;
				}
				ngModelCtrl.$setViewValue(ngModelCtrl.$viewValue - ctrl.myOptions.step);
				ngModelCtrl.$render();
				ngModelCtrl.$setTouched();
			};

		},
		bindings: {
			placeholder: '<',
			options: '<',
		}
	});

	

})();
