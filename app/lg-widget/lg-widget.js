'use strict';


module.exports = 'lg-widget';

var app = angular.module(module.exports, []);

require('./lg-widget.scss');
require('./lg-hr.js');

var lgPromptUrl = require('./tmpl/lg-prompt.html');
var lgConfirmUrl = require('./tmpl/lg-confirm.html');
var lgMessageUrl = require('./tmpl/lg-message.html');
var lgFooterUrl = require('./tmpl/lg-footer.html');

app.component('lgPrompt', {
	templateUrl: lgPromptUrl,
	bindings: {
		service: '<'
	}
});

app.component('lgConfirm', {
	templateUrl: lgConfirmUrl,
	bindings: {
		service: '<'
	}
});

app.component('lgMessage', {
	templateUrl: lgMessageUrl,
	bindings: {
		service: '<'
	}
});

app.component('lgFooter', {
	templateUrl: lgFooterUrl
});

app.service('lgPicture', function LgPicture() {
	this.ctrl = undefined;
	this.show = function(url) {
		console.log('lgPicture.show', arguments);
		this.ctrl.open(url);
	};
});

var lgShowPictureUrl = require('./tmpl/lg-show-picture.html');

app.component('lgShowPicture', {
	templateUrl: lgShowPictureUrl,
	controller: function LgShowPictureCtrl($element, lgPicture) {
		lgPicture.ctrl = this;

		this.open = function(url) {
			this.url = url;
			$element.css('display', 'block');
		};
		this.close = function() {
			console.log('LgShowPictureCtrl.close', arguments);
			$element.css('display', 'none');
		};
	}
});

var lgFaviconUrl = require('./tmpl/lg-favicon.html');

app.component('lgFavicon', {
	templateUrl: lgFaviconUrl
});

app.component('lgSelect', {
	require: {
		ngModel: 'ngModel',
	},
	controller: function LgSelectCtrl($scope, $element, $compile) {
		'ngInject';
		console.log('LgSelectCtrl', arguments);
		var ctrl = this;
		var isInit = true;
		ctrl.update = function(value) {
			console.log('lgSelect update', arguments);
			ctrl.ngModel.$setViewValue(value);
			ctrl.ngModel.$render();
			ctrl.ngModel.$setTouched();
		};
		ctrl.$onInit = function() {
			ctrl.ngModel.$render = function() {
				console.log('lgSelect $render', arguments);
				var value = ctrl.ngModel.$viewValue;
				console.log('lgSelect value', value);
				var elts = $element.find('lg-option');
				console.log('lgSelect elts', elts);
				elts.removeAttr('selected');
				var elt = angular.element($element[0].querySelector('lg-option[value=' + value + ']'));
				elt.attr('selected', '');
				if (isInit) {
					var optionElts = $element.find('lg-option');
					for (var i = 0; i < optionElts.length; i++) {
						var e = angular.element(optionElts[i]);
						var val = e.attr('value');
						e.attr('ng-click', '$ctrl.update(\'' + val + '\')');
					}
					$compile($element.contents())($scope);
				}
				isInit = false;
			};
		};
	}
});
