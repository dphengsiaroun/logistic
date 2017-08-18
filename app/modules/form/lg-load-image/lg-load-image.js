import './lg-load-image.scss';

module.exports = 'lg-load-image';

// const url = './ws/upload.php';

const app = angular.module(module.exports, []);

import lgLoadImageHtml from './tmpl/lg-load-image.html';

app.component('lgLoadImage', {
	template: lgLoadImageHtml,
	require: {ngModel: 'ngModel'},
	controller: function LgLoadImageCtrl() {
		'ngInject';
		console.log('LgLoadImageCtrl', arguments);
		const ctrl = this;

		ctrl.$onInit = function() {
			
		};
	}
});
