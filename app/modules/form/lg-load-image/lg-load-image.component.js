import lgLoadImageHtml from './tmpl/lg-load-image.html';

export const LgLoadImage = {
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
};
