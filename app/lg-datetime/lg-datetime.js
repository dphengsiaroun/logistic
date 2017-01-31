'use strict';

module.exports = 'lg-datetime';

var app = angular.module(module.exports, ['lg-misc']);

require('./lg-datetime.scss');
require('./lg-dt-month.js');
require('./lg-dt-hour.js');

var lgDatetimeUrl = require('./tmpl/lg-datetime.html');

function makeRange(start, end) {
	return Array.apply(null, Array(end - start + 1)).map((n, i) => i + start);
}

app.component('lgDatetime', {
	require: {
		ngModel: 'ngModel',
	},
	templateUrl: lgDatetimeUrl,
	controller: function lgDatetimeCtrl($scope, $element, $filter, $parse, lgScroll) {
		'ngInject';
		console.log('lgDatetimeCtrl');
		var ctrl = this;
		ctrl.format = 'EEEE dd LLLL - HH:mm';

		ctrl.lgDtHour = undefined;

		ctrl.state = 'outsideState';

		var hourRange = makeRange(0, 23);
		ctrl.hourRange = hourRange;

		ctrl.opts = {
			monthNbr: 6,
			constraint: {},
			lgHour: 1,
			defaultHour: 7
		};

		ctrl.start = () => {
			ctrl.state = 'dateState';
			lgScroll.save();
			ctrl.compute();
		};

		ctrl.stop = () => {
			ctrl.state = 'outsideState';
			lgScroll.restore();
			ctrl.months = [];
		};

		ctrl.update = (date) => {
			ctrl.selectedDate = date;
			ctrl.adjustHourRange();
			ctrl.ngModel.$setViewValue(date);
			ctrl.ngModel.$render();
			ctrl.ngModel.$setTouched();
		};

		ctrl.adjustHourRange = () => {
			if (ctrl.selectedDate === undefined) {
				return;
			}
			if (ctrl.selectedDate.toDateString() === ctrl.opts.start.toDateString()) {
				if (ctrl.opts.after) {
					ctrl.hourRange = makeRange(ctrl.opts.start.getHours(), 23);
				} else {
					ctrl.hourRange = makeRange((ctrl.opts.start.getHours() + 1) % 24, 23);
				}
				if (ctrl.hourRange.indexOf(ctrl.selectedHours) === -1) {
					var $index = ctrl.hourRange.indexOf(ctrl.selectedHours);
					ctrl.lgDtHour.update(ctrl.hourRange[0], $index);
				}
			} else {
				ctrl.hourRange = hourRange;
			}
		};

		ctrl.cancel = () => {
			ctrl.update(undefined);
			ctrl.stop();
		};

		ctrl.compute = () => {
			console.log('compute');
			ctrl.months = [];
			for (var i = 0; i < ctrl.opts.monthNbr; i++) {
				var date = new Date(ctrl.opts.start);
				date.setDate(1);
				date.setMonth(date.getMonth() + i);
				ctrl.months.push(date);
			}
			console.log('ctrl.months', ctrl.months);
		};

		ctrl.setDate = (year, month, day) => {
			console.log('setDate', arguments);
			console.log('year', year);
			var date = new Date(year, month, day, ctrl.selectedHours);
			console.log('date', date);
			ctrl.update(date);
		};

		ctrl.setHours = (hour) => {
			console.log('setHours', arguments);
			ctrl.selectedHours = hour;
			var date = ctrl.ngModel.$viewValue;
			console.log('date', date);
			if (!date) {
				return;
			}
			date.setHours(hour);
			console.log('ctrl.ngModel.$setViewValue', ctrl.ngModel.$viewValue);
			ctrl.ngModel.$render();
			ctrl.ngModel.$setTouched();
		};

		ctrl.initOptions = () => {
			angular.extend(ctrl.opts, ctrl.options);
			console.log('options', ctrl.options);
			ctrl.opts.start = new Date();
			if (ctrl.opts.after) {
				console.log('ctrl.opts.after', ctrl.opts.after);
				ctrl.opts.start = $parse(ctrl.opts.after)($scope.$parent);
				console.log('ctrl.opts.after ctrl.opts.start', ctrl.opts.start);
			}
			ctrl.selectedHours = ctrl.opts.defaultHour;
		};

		ctrl.$onInit = () => {
			console.log('lgCalendarWrapper ctrl $onInit', ctrl);
			console.log('this.ngModel', ctrl.ngModel);

			ctrl.initOptions();

			ctrl.ngModel.$render = () => {
				console.log('ctrl.ngModel.$render', arguments);

				var datetime = undefined;
				if (ctrl.ngModel.$viewValue !== undefined) {
					datetime = $filter('date')(ctrl.ngModel.$viewValue, ctrl.format);
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

			var checkValidity = (value) => {
				var isOutOfChoice = false;
				ctrl.ngModel.$setValidity('outOfChoice', isOutOfChoice);
			};
		};

	},
	bindings: {
		title: '@',
		choices: '<',
		placeholder: '@',
		options: '<'
	}
});
