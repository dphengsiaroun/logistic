import './lg-desktop.scss';
module.exports = 'lg-desktop';

const app = angular.module(module.exports, []);

import lgDesktopHtml from './tmpl/lg-desktop.html';

app.component('lgDesktop', {
	template: lgDesktopHtml,
	controller: function LgDesktopCtrl($element) {
		'ngInject';
		

	}
});
