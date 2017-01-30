'use strict';

var app = angular.module('lg-datetime');

var lgDtHourUrl = require('./tmpl/lg-dt-hour.html');

app.component('lgDtHour', {
	require: {
		lgDatetime: '^^lgDatetime'
	},
	templateUrl: lgDtHourUrl,
	controller: function LgDtHourCtrl($scope, $element, $locale, $compile) {
		var ctrl = this;
		ctrl.update = function(hour) {
			console.log('LgDtHourCtrl update', arguments);
			console.log('$element', $element.html());
			var elt = $element.find('line');
			elt.css('left', (44-(hour*14.6)) + '%');
			this.action.apply(null, [hour]);
		};

		ctrl.$onInit = function() {
			console.log('LgDtHourCtrl $onInit', arguments);
			ctrl.update(ctrl.selectedHours);
		};

	},
	bindings: {
		action: '<',
		selectedHours: '<'
	}
});

