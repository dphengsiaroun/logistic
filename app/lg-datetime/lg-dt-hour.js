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
			console.log('update', arguments);
			var elt = $element.find('line');
			elt.css('left', (44-(hour*14.6)) + '%');
			var allHourElt = $element.find('line span');
			allHourElt.removeClass('selected');
			var hourElt = angular.element($element[0].querySelector('line .h' + hour));
			hourElt.addClass('selected');
		};
	},
	bindings: {
		action: '<',
		selectedHours: '<'
	}
});

