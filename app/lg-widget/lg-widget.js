(function() {
	'use strict';

	var app = angular.module('lg-widget', []);

	app.component('lgPrompt', {
		templateUrl: 'lg-widget/tmpl/lg-prompt.html',
		bindings: {
			service: '<'
		}
	});

	app.component('lgConfirm', {
		templateUrl: 'lg-widget/tmpl/lg-confirm.html',
		bindings: {
			service: '<'
		}
	});

	app.component('lgMessage', {
		templateUrl: 'lg-widget/tmpl/lg-message.html',
		bindings: {
			service: '<'
		}
	});

	app.component('lgFooter', {
		templateUrl: 'lg-widget/tmpl/lg-footer.html'
	});

	app.service('lgPicture', function LgPicture() {
		this.ctrl = undefined;
		this.show = function(url) {
			console.log('lgPicture.show', arguments);
			this.ctrl.open(url);
		};
	});

	app.component('lgShowPicture', {
		templateUrl: 'lg-widget/tmpl/lg-show-picture.html',
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

})();
