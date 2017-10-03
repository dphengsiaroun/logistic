import lgNumVerticalHtml from './tmpl/lg-num-vertical.html';
import lgNumHtml from './tmpl/lg-num.html';

export const LgNum = {
	require: {
		ngModel: 'ngModel'
	},
	template: function($attrs) {
		'ngInject';
		console.log('lgNum template', arguments, this);
		if ($attrs.class === 'vertical') {
			console.log('lgNum vertical');
			return lgNumVerticalHtml;
		}
		return lgNumHtml;
	},
	controller: function($element, $filter, $interval, $timeout) {
		'ngInject';
		console.log('lgNum controller', arguments, this);
		console.log('lgNum controller', arguments, this.ngModel);
		const ctrl = this;
		let ngModelCtrl;
		const elt = $element.find('my-input');
		const plusElt = $element.find('plus');
		const minusElt = $element.find('minus');
		this.myOptions = {
			format: 3,
			step: 1
		};

		let timeout;
		let interval;
		let interval2;

		const touchstart = function(callback) {
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

		const touchend = function() {
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

			elt.on('touchend', function(e) {
				e.preventDefault();
			});
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
				let valueStr = ctrl.placeholder;
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
};