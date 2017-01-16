'use strict';


module.exports = 'lg-widget';

var app = angular.module(module.exports, []);

require('./lg-widget.css');
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
