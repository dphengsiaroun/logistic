import './lg-load-image.scss';

module.exports = 'lg-load-image';

import {LgImageLoader} from './lgImageLoader.service.js';

const app = angular.module(module.exports, []);

import lgLoadImageHtml from './tmpl/lg-load-image.html';

app.component('lgLoadImage', {
	template: lgLoadImageHtml,
	require: {ngModel: 'ngModel'},
	bindings: {
		formData: '<'
	},
	controller: function LgLoadImageCtrl($element, $scope, lgImageLoader) {
		'ngInject';
		console.log('LgLoadImageCtrl', arguments);
		const ctrl = this;
		
		ctrl.active = false;
		ctrl.progress = 0;
		ctrl.$onInit = function() {
			const imageLoader = lgImageLoader.newInstance(ctrl);
			imageLoader.init();
			const inputElt = $element.find('input');
			console.log('inputElt', inputElt);
			inputElt.on('change', function() {
				console.log('change', arguments, this);
				console.log('inputElt', inputElt);
				imageLoader.send(inputElt);
			});
		};
	}
});

app.service('lgImageLoader', LgImageLoader);
