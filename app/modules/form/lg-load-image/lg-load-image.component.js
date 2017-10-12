import lgLoadImageHtml from './tmpl/lg-load-image.html';

export const LgLoadImage = {
	template: lgLoadImageHtml,
	require: {ngModel: 'ngModel'},
	bindings: {
		formData: '<'
	},
	controller: function LgLoadImageCtrl($element, $scope, lgImageLoader) {
		'ngInject';
		
		const ctrl = this;
		
		ctrl.active = false;
		ctrl.progress = 0;
		ctrl.$onInit = function() {
			const imageLoader = lgImageLoader.newInstance(ctrl);			
			$scope.$watch('$ctrl.formData', function() {
				imageLoader.init();
			}, true);
			
			const inputElt = $element.find('input');
			inputElt.on('change', function() {
				imageLoader.send(inputElt);
			});
		};
	}
};
