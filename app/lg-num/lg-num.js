(function() {
	'use strict';

	var app = angular.module('lg-num', []);

	app.directive('input', ['$injector', function($injector) {
		var $compile = $injector.get('$compile');
		return {
			restrict: 'E',
			require: '?ngModel',
			link: function (scope, element, attrs, ctrl) {
				if (attrs.type !== 'num') {
					return;
				}
				console.log('input type="num"', arguments);
				var myClass = ('vertical' in attrs) ? 'class="vertical"' : '';
				var elt = angular.element('<!-- input type="num" ng-model="' + attrs.ngModel + '" -->' +
					'<lg-num ' + myClass + ' ng-model="' + attrs.ngModel + 
					'" options="' + attrs.options + 
					'" placeholder="\'' + attrs.placeholder + '\'"></lg-num>');
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
		templateUrl: function($attrs) {
			console.log('lgNum templateUrl', arguments, this);
			if ($attrs.class === 'vertical') {
				console.log('lgNum vertical');
				return 'lg-num/tmpl/lg-num-vertical.html';
			}
			return 'lg-num/tmpl/lg-num.html';
		},
		controller: function($element, $filter, $interval, $timeout) {
			'ngInject';
			console.log('lgNum controller', arguments, this);
			console.log('lgNum controller', arguments, this.ngModel);
			var ctrl = this;
			var ngModelCtrl;
			var elt = $element.find('my-input');
			var plusElt = $element.find('plus');
			var minusElt = $element.find('minus');
			
			this.myOptions = {
				format: 3,
				step: 1
			};

			var timeout = undefined;
			var interval = undefined;
			var interval2 = undefined;

			var touchstart = function(callback) {
				return function() {
					console.log('touchstart', arguments);
					callback();
					timeout = $timeout(function() {
						timeout = undefined;
						elt.addClass('editing');
						interval = $interval(function() {
							callback();
						}, 100);
						timeout = $timeout(function() {
							interval2 = $interval(function() {
							callback();
							if (interval !== undefined) {
								$interval.cancel(interval);
								interval = undefined;
							}
						}, 20);
						}, 2000);
					}, 800);
				};
				
				
			};

			var touchend = function() {
				console.log('touchend', arguments);
				elt.removeClass('editing');
				if (timeout !== undefined) {
					$timeout.cancel(timeout);
					timeout = undefined;
				}
				
				if (interval !== undefined) {
					$interval.cancel(interval);
					interval = undefined;
				}

				if (interval2 !== undefined) {
					$interval.cancel(interval2);
					interval2 = undefined;
				}
				
			};

			this.build = function() {
				console.log('build', arguments);
				
				plusElt.on('touchstart', touchstart(ctrl.plus));	
				plusElt.on('touchend', touchend);
				plusElt.on('mouseup', touchend);

				minusElt.on('touchstart', touchstart(ctrl.minus));	
				minusElt.on('touchend', touchend);
				minusElt.on('mouseup', touchend);
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

				this.build();

				
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
