module.exports = 'lg-widget';
import './lg-widget.scss';

const app = angular.module(module.exports, []);

import lgPromptHtml from './tmpl/lg-prompt.html';
import lgConfirmHtml from './tmpl/lg-confirm.html';
import lgMessageHtml from './tmpl/lg-message.html';
import lgFooterHtml from './tmpl/lg-footer.html';
import lgHrHtml from './tmpl/lg-hr.html';

app.component('lgHr', {
	transclude: true,
	template: lgHrHtml,
});


app.component('lgPrompt', {
	template: lgPromptHtml,
	bindings: {
		service: '<'
	}
});

app.component('lgConfirm', {
	template: lgConfirmHtml,
	bindings: {
		service: '<'
	}
});

app.component('lgMessage', {
	template: lgMessageHtml,
	bindings: {
		service: '<'
	}
});

app.component('lgFooter', {
	template: lgFooterHtml
});

app.service('lgPicture', function LgPicture() {
	this.ctrl = undefined;
	this.show = function(url) {
		console.log('lgPicture.show', arguments);
		this.ctrl.open(url);
	};
});

import lgShowPictureHtml from './tmpl/lg-show-picture.html';

app.component('lgShowPicture', {
	template: lgShowPictureHtml,
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

import lgFaviconHtml from './tmpl/lg-favicon.html';

app.component('lgFavicon', {
	template: lgFaviconHtml
});

app.component('lgSelect', {
	require: {
		ngModel: 'ngModel',
	},
	controller: function LgSelectCtrl($scope, $element, $compile) {
		'ngInject';
		console.log('LgSelectCtrl', arguments);
		const ctrl = this;
		let isInit = true;
		ctrl.update = function(value) {
			console.log('lgSelect update', arguments);
			ctrl.ngModel.$setViewValue(value);
			ctrl.ngModel.$render();
			ctrl.ngModel.$setTouched();
		};
		ctrl.$onInit = function() {
			ctrl.ngModel.$render = function() {
				console.log('lgSelect $render', arguments);
				const value = ctrl.ngModel.$viewValue;
				console.log('lgSelect value', value);
				const elts = $element.find('lg-option');
				console.log('lgSelect elts', elts);
				elts.removeAttr('selected');
				const elt = angular.element($element[0].querySelector('lg-option[value=' + value + ']'));
				elt.attr('selected', '');
				if (isInit) {
					const optionElts = $element.find('lg-option');
					for (let i = 0; i < optionElts.length; i++) {
						const e = angular.element(optionElts[i]);
						const val = e.attr('value');
						e.attr('ng-click', '$ctrl.update(\'' + val + '\')');
					}
					$compile($element.contents())($scope);
				}
				isInit = false;
			};
		};
	}
});

import lgCityHtml from './tmpl/lg-city.html';

app.component('lgCity', {
	require: {
		ngModel: 'ngModel',
	},
	template: lgCityHtml,
	bindings: {
		name: '@',
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
				const html = scope.$eval(attrs.lgBindHtmlCompile);
				return html;
			}, function(value) {
				element.html(value);
				$compile(element.contents())(scope);
			});
		}
	};
});

import './tmpl/lg-image.html';

app.component('imgSvg', {
	controller: function ImgSvgCtrl($scope, $element, $attrs, $templateCache, $compile) {
		'ngInject';
		const svg = $templateCache.get($attrs.src);
		$element.html(svg);
		if ('compile' in $attrs) {
			$compile($element.contents())($scope.$parent);
		}
	}
});

import lgSocialLoginHtml from './tmpl/lg-social-login.html';
app.component('lgSocialLogin', {
	template: lgSocialLoginHtml
});

import './css/lg-breadcrumb.scss';
import lgBreadcrumbHtml from './tmpl/lg-breadcrumb.html';
app.component('lgBreadcrumb', {
	template: lgBreadcrumbHtml
});
