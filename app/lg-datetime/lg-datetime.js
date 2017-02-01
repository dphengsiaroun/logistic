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
	controller: function LgDatetimeCtrl($scope, $element, $filter, $parse, lgScroll, lgFormat) {
		'ngInject';
		console.log('lgDatetimeCtrl');
		var ctrl = this;
		ctrl.format = 'EEEE dd LLLL - H:mm';

		ctrl.lgDtHour = undefined;

		ctrl.state = 'outsideState';

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
			ctrl.ngModel.$setViewValue(date);
			ctrl.ngModel.$render();
			ctrl.ngModel.$setTouched();
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
			if (ctrl.selectedHours === hour) {
				return;
			}
			ctrl.selectedHours = hour;
			var date = ctrl.ngModel.$viewValue;
			console.log('date', date);
			if (!date) {
				return;
			}
			date.setHours(hour);
			date = new Date(date);
			ctrl.update(date);
		};

		ctrl.initOptions = () => {
			angular.extend(ctrl.opts, ctrl.options);
			console.log('options', ctrl.options);
			ctrl.opts.start = new Date();
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

		ctrl.$onChanges = function(changesObj) {
			console.log('LgDatetimeCtrl $onChanges', changesObj);
			if (changesObj.after) {
				ctrl.opts.after = changesObj.after.currentValue instanceof Date;
				if (ctrl.opts.after) {
					console.log('LgDatetimeCtrl $onChanges ctrl.offset', ctrl.offset);
					var offset = Math.ceil(ctrl.offset / 3600) * 3600;
					ctrl.opts.start = new Date(changesObj.after.currentValue.getTime() +
					(offset * 1000));
					console.log('LgDatetimeCtrl $onChanges check start is before selectedDate');
					if (ctrl.opts.start > ctrl.selectedDate) {
						console.log('LgDatetimeCtrl $onChanges : start is after selectedDate');
						ctrl.update(undefined);
					}
				}
				console.log('LgDatetimeCtrl $onChanges ctrl.opts.start', ctrl.opts.start);
			}
			if (changesObj.offset && ctrl.opts.after) {
				console.log('LgDatetimeCtrl $onChanges ctrl.opts.start update');
				ctrl.opts.start = new Date(ctrl.opts.start.getTime() + (changesObj.offset.currentValue / 1000));
				console.log('LgDatetimeCtrl $onChanges ctrl.opts.start', ctrl.opts.start);
			}

		};

		$scope.$watch('$ctrl.selectedDate', () => {
			if (!ctrl.selectedDate) {
				ctrl.retroactionMsg = '&nbsp;<br/>&nbsp;';
				return;
			}
			var durationStr = '';
			if (ctrl.opts.after) {
				var duration = (ctrl.selectedDate - ctrl.after)/1000;
				durationStr = '<br/>Durée&nbsp;:&nbsp;' + lgFormat.formatDuration(duration);
			}
			ctrl.retroactionMsg = $filter('date')(ctrl.selectedDate, ctrl.format) + durationStr;
		}, true);

	},
	bindings: {
		title: '@',
		choices: '<',
		placeholder: '@',
		options: '<',
		after: '<',
		offset: '<'
	}
});
