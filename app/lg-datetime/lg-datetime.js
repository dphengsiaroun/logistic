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
	controller: function lgDatetimeCtrl($scope, $element, $filter, lgScroll) {
		'ngInject';
		console.log('lgDatetimeCtrl');
		var ctrl = this;
		var ngModelCtrl;
		ctrl.format = 'EEEE dd LLLL';

		ctrl.state = 'outsideState';

		ctrl.myOptions = {
			position: 'now',
			monthNbr: 6,
			constraint: {},
			lgHour: 1,
			defaultHour: 6
		};

		ctrl.start = function() {
			this.state = 'dateState';
			lgScroll.save();
			this.compute();
		};

		ctrl.stop = function() {
			this.state = 'outsideState';
			lgScroll.restore();
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
			ctrl.months = [];
			for (var i = 0; i < ctrl.myOptions.monthNbr; i++) {
				var date = new Date(ctrl.myOptions.start);
				date.setMonth(date.getMonth() + i);
				ctrl.months.push(date);
			}

		};

		ctrl.setDate = function(year, month, day) {
			console.log('setDate', arguments);
			console.log('year', year);
			var date = new Date(year, month, day, ctrl.myOptions.defaultHour);
			console.log('date', date);
			ctrl.update(date);
			ctrl.selectedHours = date.getHours();
		};

		ctrl.setHours = function(hour) {
			console.log('setHours', arguments);
			var date = ngModelCtrl.$viewValue;
			date.setHours(hour);
			ctrl.selectedHours = date.getHours();
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

			ngModelCtrl.$render = function() {
				console.log('ngModelCtrl.$render', arguments);

				var datetime = undefined;
				if (ngModelCtrl.$viewValue !== undefined) {
					datetime = $filter('date')(ngModelCtrl.$viewValue, 'EEEE dd LLLL - HH:mm');
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
