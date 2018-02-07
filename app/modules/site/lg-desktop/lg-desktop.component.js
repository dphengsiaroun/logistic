import './lg-desktop.scss';
module.exports = 'lg-desktop';

const app = angular.module(module.exports, []);

import lgDesktopHtml from './tmpl/lg-desktop.html';

app.component('lgDesktop', {
	template: lgDesktopHtml,
	controller: function LgDesktopCtrl($document, $window, lgMobile) {
		'ngInject';
		function reset() {
			console.log('reset');
			if (lgMobile.isMobile()) {
				angular.element($document[0].body).removeClass('desktop');
			} else {
				angular.element($document[0].body).addClass('desktop');
			}
		}

		$window.addEventListener('resize', reset);
		
		reset();
		
	}
});
