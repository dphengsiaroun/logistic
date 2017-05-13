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
					for (let i = 0; i < optionElts.length; i++) {
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

var lgCityUrl = require('./tmpl/lg-city.html');

app.component('lgCity', {
	require: {
		ngModel: 'ngModel',
	},
	templateUrl: lgCityUrl,
	bindings: {
		title: '@',
		placeholder: '@',
		myModel: '=ngModel'
	}
});

app.directive('lgBindHtmlCompile', function($compile) {
	'ngInject';
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			scope.$watch(function() {
				var html = scope.$eval(attrs.lgBindHtmlCompile);
				return html;
			}, function(value) {
				element.html(value);
				$compile(element.contents())(scope);
			});
		}
	};
});

require('./tmpl/lg-image.html');

app.component('imgSvg', {
	controller: function ImgSvgCtrl($scope, $element, $attrs, $templateCache, $compile) {
		'ngInject';
		var svg = $templateCache.get($attrs.src);
		$element.html(svg);
		if ('compile' in $attrs) {
			$compile($element.contents())($scope.$parent);
		}
	}
});

var lgSocialLoginUrl = require('./tmpl/lg-social-login.html');
app.component('lgSocialLogin', {
	templateUrl: lgSocialLoginUrl
});


app.component('lgCreateButton', {
	template: '<button ui-sref="{{$ctrl.state}}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Déposer une annonce</button>',
	bindings: {
		state: '@'
	},
	controller: function LgCreateButtonCtrl($scope, $element, $attrs, $document) {
		'ngInject';
		console.log('lgCreateButton ctrl', arguments);
		var ctrl = this;
		var lastScrollTop = 0;

		ctrl.show = function() {
			if ($element.attr('style')) {
				$element.removeAttr('style');
			}
		};
		ctrl.hide = function() {
			if ($element.attr('style') === undefined) {
				$element.attr('style', 'display: none');
			}
		};
		ctrl.$onInit = function() {
			console.log('lgCreateButton ctrl onInit', arguments);

			$document.on('scroll', function() {
				console.log('touchmove', arguments);
				var st = $document.scrollTop();
				if (st >= lastScrollTop) {
					// downscroll code
					console.log('downscroll', st);
					ctrl.hide();
				} else {
					// upscroll code
					console.log('upscroll', st);
					ctrl.show();
				}
				if (st > 0) {
					lastScrollTop = st;
				}
			});
		};



		ctrl.$onDestroy = function() {
			console.log('lgCreateButton ctrl onDestroy', arguments);
			$document.off('scroll');
		};
	}
});

require('./css/lg-breadcrumb.scss');
var lgBreadcrumbUrl = require('./tmpl/lg-breadcrumb.html');
app.component('lgBreadcrumb', {
	templateUrl: lgBreadcrumbUrl
});
