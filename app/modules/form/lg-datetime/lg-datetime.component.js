import lgDatetimeHtml from './tmpl/lg-datetime.html';

export const lgDatetime = {
	require: {
		ngModel: 'ngModel',
	},
	template: lgDatetimeHtml,
	controller: function LgDatetimeCtrl($scope, $element, $filter, $parse, lgScroll) {
		'ngInject';
		
		const ctrl = this;
		ctrl.format = 'EEEE dd LLLL - H:mm';

		ctrl.lgDtHour = undefined;

		ctrl.state = 'outsideState';

		ctrl.opts = {
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
			ctrl.ngModel.$setViewValue(date);
			ctrl.ngModel.$render();
			ctrl.ngModel.$setTouched();
		};

		ctrl.cancel = function() {
			ctrl.update(undefined);
			ctrl.stop();
		};

		ctrl.compute = function() {
			
			ctrl.months = [];
			for (let i = 0; i < ctrl.opts.monthNbr; i++) {
				const date = new Date(ctrl.opts.start);
				date.setDate(1);
				date.setMonth(date.getMonth() + i);
				ctrl.months.push(date);
			}
			
		};

		ctrl.setDate = function(year, month, day) {
			
			
			const date = new Date(year, month, day, ctrl.selectedHours);
			
			ctrl.update(date);
		};

		ctrl.setHours = function(hour) {
			
			if (ctrl.selectedHours === hour) {
				return;
			}
			ctrl.selectedHours = hour;
			let date = ctrl.ngModel.$viewValue;
			
			if (!date) {
				return;
			}
			date.setHours(hour);
			date = new Date(date);
			ctrl.update(date);
		};

		ctrl.initOptions = function() {
			angular.extend(ctrl.opts, ctrl.options);
			
			ctrl.opts.start = new Date();
			ctrl.selectedHours = ctrl.opts.defaultHour;
		};

		function checkValidity(value) {
			const isOutOfChoice = true;
			ctrl.ngModel.$setValidity('outOfChoice', isOutOfChoice);
		}

		ctrl.$onInit = function() {
			
			

			ctrl.initOptions();

			ctrl.ngModel.$render = function() {
				

				let datetime;
				if (ctrl.ngModel.$viewValue !== undefined) {
					datetime = $filter('date')(ctrl.ngModel.$viewValue, ctrl.format);
				}
				const html = datetime || ctrl.placeholder;
				const elt = $element.find('my-input');
				if (datetime) {
					elt.removeClass('empty');
				} else {
					elt.addClass('empty');
				}
				elt.html(html);
				checkValidity(1);
			};
			
		};

		ctrl.$onChanges = function(changesObj) {
			
			let offset = ctrl.offset || 0;
			offset = Math.ceil(offset / 3600) * 3600;
			if (changesObj.after) {
				ctrl.opts.after = changesObj.after.currentValue instanceof Date;
				
			}
			if (ctrl.opts.after) {
				
				ctrl.opts.start = new Date(ctrl.after.getTime() +
					(offset * 1000));
				
			}
			if (ctrl.opts.start > ctrl.selectedDate) {
				
				ctrl.update(undefined);
			}
		};

		$scope.$watch('$ctrl.selectedDate', function() {
			if (!ctrl.selectedDate) {
				ctrl.retroactionMsg = '&nbsp;<br>&nbsp;';
				return;
			}
			let durationStr = '';
			if (ctrl.opts.after) {
				const duration = (ctrl.selectedDate - ctrl.after) / 1000;
				durationStr = '<br>Durée&nbsp;:&nbsp;' + $filter('duration')(duration);
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
};
