'use strict';

module.exports = 'lg-datetime';

var app = angular.module(module.exports, ['lg-misc']);

require('./lg-datetime.scss');
require('./lg-dt-month.js');
require('./lg-dt-hour.js');

var lgDatetimeUrl = require('./tmpl/lg-datetime.html');

app.component('lgDatetime', {
	require: {
		ngModel: 'ngModel',
	},
	templateUrl: lgDatetimeUrl,
	controller: function lgDatetimeCtrl($scope, $element, $filter, $parse, lgScroll) {
		'ngInject';
		console.log('lgDatetimeCtrl');
		var ctrl = this;
		var ngModelCtrl;
		ctrl.format = 'EEEE dd LLLL - HH:mm';

		ctrl.state = 'outsideState';

		ctrl.myOptions = {
			position: 'now',
			monthNbr: 6,
			constraint: {},
			lgHour: 1,
			defaultHour: 7
		};

		ctrl.start = function() {
			ctrl.state = 'dateState';
			lgScroll.save();
			ctrl.compute();
		};

		ctrl.stop = function() {
			ctrl.state = 'outsideState';
			lgScroll.restore();
			ctrl.months = [];
		};

		ctrl.update = function(date) {
			ctrl.selectedDate = date;
			ngModelCtrl.$setViewValue(date);
			ngModelCtrl.$render();
			ngModelCtrl.$setTouched();
		};

		ctrl.cancel = function() {
			ctrl.update(undefined);
			ctrl.stop();
		};

		ctrl.compute = function() {
			console.log('compute');
			ctrl.myOptions.start = new Date();
			if (ctrl.myOptions.position === 'now') {
				ctrl.myOptions.start = new Date();
			}
			if (ctrl.myOptions.after) {
				console.log('ctrl.myOptions.after', ctrl.myOptions.after);
				ctrl.myOptions.start = $parse(ctrl.myOptions.after)($scope.$parent);
				console.log('ctrl.myOptions.after ctrl.myOptions.start', ctrl.myOptions.start);
				if (!ctrl.myOptions.start) {
					ctrl.myOptions.start = new Date();
				}
			}
			ctrl.months = [];
			for (var i = 0; i < ctrl.myOptions.monthNbr; i++) {
				var date = new Date(ctrl.myOptions.start);
				date.setDate(1);
				date.setMonth(date.getMonth() + i);
				ctrl.months.push(date);
			}
			console.log('ctrl.months', ctrl.months);
		};

		ctrl.setDate = function(year, month, day) {
			console.log('setDate', arguments);
			console.log('year', year);
			var date = new Date(year, month, day, ctrl.selectedHours);
			console.log('date', date);
			ctrl.update(date);
		};

		ctrl.setHours = function(hour) {
			console.log('setHours', arguments);
			ctrl.selectedHours = hour;
			var date = ngModelCtrl.$viewValue;
			console.log('date', date);
			if (!date) {
				return;
			}
			date.setHours(hour);
			console.log('ngModelCtrl.$setViewValue', ngModelCtrl.$viewValue);
			ngModelCtrl.$render();
			ngModelCtrl.$setTouched();
		};

		ctrl.$onInit = function() {
			console.log('lgCalendarWrapper ctrl $onInit', ctrl);
			console.log('this.ngModel', ctrl.ngModel);
			ngModelCtrl = ctrl.ngModel;

			console.log('options', ctrl.options);
			angular.extend(ctrl.myOptions, ctrl.options);
			ctrl.selectedHours = ctrl.myOptions.defaultHour;

			ngModelCtrl.$render = function() {
				console.log('ngModelCtrl.$render', arguments);

				var datetime = undefined;
				if (ngModelCtrl.$viewValue !== undefined) {
					datetime = $filter('date')(ngModelCtrl.$viewValue, ctrl.format);
				}
				var html = datetime || ctrl.placeholder;
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

	},
	bindings: {
		title: '@',
		choices: '<',
		placeholder: '@',
		isMandatory: '<',
		options: '<'
	}
});
